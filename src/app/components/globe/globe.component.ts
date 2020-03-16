import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_continentsLow from '@amcharts/amcharts4-geodata/continentsLow';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {ApiService} from '../../services/api.service';


@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: am4maps.MapChart;
  public worldDataArray: any[];

  constructor(
    private zone: NgZone,
    private apiService: ApiService
  ) {
  }


  ngOnInit(): void {
    const countriesArray = [];
    this.apiService.getCountriesData().subscribe((res: any[]) => {
      res.forEach((country: any) => {
        const singleCountryData = {[country.iso2]: country.confirmed};
        countriesArray.push(singleCountryData);
      });
      this.worldDataArray = this.sumDuplicateKeysInArray(countriesArray);
      this.drawGlobe();
    });
  }


  sumDuplicateKeysInArray(array: any) {
    const result = [array.reduce((acc: any, n: any) => {
      for (const prop in n) {
        if (acc.hasOwnProperty(prop)) {
          acc[prop] += n[prop];
        } else {
          acc[prop] = n[prop];
        }
      }
      return acc;
    }, {})];
    const arrayResult = [];
    Object.keys(result).forEach((element: any) => {
      arrayResult.push({[element]: result[element]});
    });
    return arrayResult[0][0];
  }

  ngAfterViewInit() {


  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


  drawGlobe() {
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);
      const chart = am4core.create('chartdiv', am4maps.MapChart);
      const interfaceColors = new am4core.InterfaceColorSet();
      const data = this.worldDataArray;
      try {
        chart.geodata = am4geodata_worldLow;
      } catch (e) {
        chart.raiseCriticalError(new Error('Map geodata could not be loaded. '));
      }

      const label = chart.createChild(am4core.Label);
      label.text = '';
      label.fontSize = 12;
      label.align = 'left';
      label.valign = 'bottom';
      label.fill = am4core.color('#000000');
      const roundedRectangle = new am4core.RoundedRectangle();
      roundedRectangle.cornerRadius(10, 10, 10, 10);
      label.background = roundedRectangle;
      label.padding(10, 10, 10, 10);
      label.marginLeft = 30;
      label.marginBottom = 30;
      label.background.strokeOpacity = 0.3;
      label.background.stroke = am4core.color('#ffffff');
      label.background.fill = am4core.color('#b1b1b1');
      label.background.fillOpacity = 0.6;

      const dataSource = chart.createChild(am4core.TextLink);
      dataSource.text = '';
      dataSource.fontSize = 12;
      dataSource.align = 'left';
      dataSource.valign = 'top';
      dataSource.url = '';
      dataSource.urlTarget = '_blank';
      dataSource.fill = am4core.color('#FFFFFF');
      dataSource.padding(10, 10, 10, 10);
      dataSource.marginLeft = 30;
      dataSource.marginTop = 30;

      // Set projection
      chart.projection = new am4maps.projections.Orthographic();
      chart.panBehavior = 'rotateLongLat';
      chart.padding(20, 20, 20, 20);

      // Add zoom control
      // chart.zoomControl = new am4maps.ZoomControl();
      //
      // const homeButton = new am4core.Button();
      // homeButton.events.on('hit', () => {
      //   chart.goHome();
      // });

      // homeButton.icon = new am4core.Sprite();
      // homeButton.padding(7, 5, 7, 5);
      // homeButton.width = 30;
      // homeButton.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
      // homeButton.marginBottom = 10;
      // homeButton.parent = chart.zoomControl;
      // homeButton.insertBefore(chart.zoomControl.plusButton);

      // TODO sea color
      chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#606060');
      chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
      chart.deltaLongitude = 20;
      chart.deltaLatitude = -20;

      // limits vertical rotation
      chart.adapter.add('deltaLatitude', (delatLatitude) => {
        return am4core.math.fitToRange(delatLatitude, -90, 90);
      });

      // Create map polygon series

      const shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      shadowPolygonSeries.geodata = am4geodata_continentsLow;

      try {
        shadowPolygonSeries.geodata = am4geodata_continentsLow;
      } catch (e) {
        shadowPolygonSeries.raiseCriticalError(
          new Error('Map geodata could not be loaded.'));
      }

      shadowPolygonSeries.useGeodata = true;
      shadowPolygonSeries.dx = 2;
      shadowPolygonSeries.dy = 2;
      shadowPolygonSeries.mapPolygons.template.fill = am4core.color('#000');
      shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
      shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
      shadowPolygonSeries.fillOpacity = 0.1;
      shadowPolygonSeries.fill = am4core.color('#000');


      // Create map polygon series
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;

      polygonSeries.calculateVisualCenter = true;
      polygonSeries.tooltip.background.fillOpacity = 0.2;
      polygonSeries.tooltip.background.cornerRadius = 20;

      const template = polygonSeries.mapPolygons.template;
      template.nonScalingStroke = true;
      // TODO country color background
      template.fill = am4core.color('#ffffff');
      // TODO country color border
      template.stroke = am4core.color('#b9b9b9');

      polygonSeries.calculateVisualCenter = true;
      template.propertyFields.id = 'id';
      template.tooltipPosition = 'fixed';
      template.fillOpacity = 1;

      template.events.on('over', (event) => {
        if (event.target.dummyData) {
          event.target.dummyData.isHover = true;
        }
      });
      template.events.on('out', (event) => {
        if (event.target.dummyData) {
          event.target.dummyData.isHover = false;
        }
      });

      // TODO hoover in countries
      const hs = polygonSeries.mapPolygons.template.states.create('hover');
      hs.properties.fillOpacity = 1;
      hs.properties.fill = am4core.color('#747474');


      // TODO fence (reticolato)
      const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
      graticuleSeries.mapLines.template.stroke = am4core.color('#fff');
      graticuleSeries.fitExtent = false;
      graticuleSeries.mapLines.template.strokeOpacity = 0.2;
      graticuleSeries.mapLines.template.stroke = am4core.color('#ffffff');


      const measelsSeries = chart.series.push(new am4maps.MapPolygonSeries());
      measelsSeries.tooltip.background.fillOpacity = 0;
      measelsSeries.tooltip.background.cornerRadius = 20;
      measelsSeries.tooltip.autoTextColor = false;
      measelsSeries.tooltip.label.fill = am4core.color('#000');
      measelsSeries.tooltip.dy = -5;

      // TODO points in counties
      const measelTemplate = measelsSeries.mapPolygons.template;
      measelTemplate.fill = am4core.color('#00ba19');
      measelTemplate.strokeOpacity = 0;
      measelTemplate.fillOpacity = 0.75;
      measelTemplate.tooltipPosition = 'fixed';


      const hs2 = measelsSeries.mapPolygons.template.states.create('hover');
      hs2.properties.fillOpacity = 1;
      hs2.properties.fill = am4core.color('#ea3e13');

      polygonSeries.events.on('inited', () => {
        polygonSeries.mapPolygons.each((mapPolygon: any) => {
          const count = data[mapPolygon.id];

          if (count > 0) {
            const polygon = measelsSeries.mapPolygons.create();
            polygon.multiPolygon = am4maps.getCircle(
              mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
            polygon.tooltipText = mapPolygon.dataItem.dataContext.name + ': ' + count;
            mapPolygon.dummyData = polygon;
            polygon.events.on('over', () => {
              mapPolygon.isHover = true;
            });
            polygon.events.on('out', () => {
              mapPolygon.isHover = false;
            });
          } else {
            mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ': no data';
            mapPolygon.fillOpacity = 0.9;
          }

        });
      });

      this.chart = chart;
    });
  }

}



