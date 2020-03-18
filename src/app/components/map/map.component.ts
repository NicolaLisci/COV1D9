import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import {Chart} from '../../models/italy/chart.model';
import {ChartEvent} from 'angular-google-charts';
import {RegionFields, RegionFieldsColor} from '../../models/italy/regioni.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {WorldLabels} from '../../models/world/world.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public todayDate: string;

  public title = 'title';
  public type = 'GeoChart';
  private features = [];
  public chartData: any = null;
  public data = [];
  public dataToVisualizeItaly = RegionFields.guariti;
  public dataToVisualizeWorld = WorldLabels.active;

  @Input() dataTypeToVisualize = new EventEmitter();
  public columnNames;
  private colors: string[];
  public dataType: string;
  @Output() showMapItaly = new EventEmitter();
  @Output() showMapWorld = new EventEmitter();

  public activePage: string;

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.url.subscribe((res: any) => {
      this.activePage = res[0].path;
    });

    if (this.activePage === environment.paths.italy) {
      this.initItalyMap();
    } else {
      this.initWorldMap();
    }

  }


  initItalyMap() {
    this.colors = ['#FFFFFF', RegionFieldsColor.guariti];

    this.columnNames = ['Regioni', RegionFields.guariti];
    this.todayDate = this.utilsService.getLastRecord();

    this.dataType = this.getEnumKeyByEnumValue(RegionFields, this.dataToVisualizeItaly);
    this.drawPointsOnItalyMap(this.dataType);

    this.dataTypeToVisualize.subscribe((res) => {
      this.dataType = this.getEnumKeyByEnumValue(RegionFields, res);
      if (!this.dataType) {
        this.matSnackBar.open('Al momento questi dati non sono disponibili!', 'Esci', {
          duration: 2000,
        });
      }

      this.columnNames = ['Regioni', res];
      this.drawPointsOnItalyMap(this.dataType);
    });
  }

  initWorldMap() {
    this.colors = ['#FFFFFF', RegionFieldsColor.guariti];
    this.columnNames = ['Stati', WorldLabels.active];
    this.dataType = this.getEnumKeyByEnumValue(WorldLabels, this.dataToVisualizeWorld);
    this.drawPointsOnWorldMap(this.dataType);
  }

  setChart(data: any, colors: string[], region: string, displayMode: string): Chart {
    const mychart: Chart = {
      type: 'GeoChart',
      data,
      options: {
        region,
        displayMode,
        colorAxis: {colors},
        backgroundColor: '#172142',
        datalessRegionColor: 'white',
        dynamicResize: true
      }
    };
    return mychart;
  }


  onSelect($event: ChartEvent) {
  }

  drawPointsOnItalyMap(dataType) {
    this.data = [];
    this.apiService.getRegionsData(this.todayDate).subscribe((res: any) => {
      this.features = res.features;
      this.features.forEach(region => {
        const regionArray = [];
        regionArray.push(region.properties.regione);
        regionArray.push(region.properties[dataType]);
        this.data.push(regionArray);
      });

      this.colors = ['#000000', RegionFieldsColor[dataType]];
      this.chartData = this.setChart(this.data, this.colors, 'IT', 'markers');
      this.showMapItaly.emit(true);
    });
  }

  getEnumKeyByEnumValue(myEnum, enumValue) {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  drawPointsOnWorldMap(dataType) {
    this.data = [];

    this.apiService.getCountriesData().subscribe((res: []) => {
      res.forEach((country: any) => {

        const countriesArray = [];
        countriesArray.push(country.countryRegion);
        countriesArray.push(country[dataType]);
        this.data.push(countriesArray);
      });

    });

    this.colors = ['#5AA454', '#FFFF00', '#FF0000'];
    this.chartData = this.setChart(this.data, this.colors, null, 'region');
    this.showMapWorld.emit(true);
  }


}
