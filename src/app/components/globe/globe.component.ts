import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import {ApiService} from '../../services/api.service';
import * as planetaryjs from '../../planetaryjs/planetaryjs.js';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import * as _ from 'lodash';

declare var $: any;

export class Location {
  public name;
  public lat;
  public long;


  constructor(name, lat, long) {
    this.name = name;
    this.lat = lat;
    this.long = long;
  }
}


@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss'],
  providers: [MatBottomSheet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobeComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: am4maps.MapChart;
  public worldDataArrayLocations: any[];
  public worldDataArray: any[];

  @Input() width;
  @Input() height;
  public showSpinner: boolean;

  public onClick = new EventEmitter();

  // "lat": 41.8719,
  // "long": 12.5674,

  constructor(
    private zone: NgZone,
    private apiService: ApiService,
    private matSnackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) {
  }


  ngOnInit(): void {

    this.showSpinner = true;
    this.onClick.subscribe((res: any) => {
      const locationFound = _.find(this.worldDataArray, (o) => {
        return o.long === res.lng && o.lat === res.lat;
      });
      this.openBottomSheet(locationFound);
    });


    const arrayLocations = [];
    this.apiService.getCountriesData().subscribe((res: any[]) => {
      this.worldDataArray = res;
      res.forEach((country: any) => {
        arrayLocations.push(new Location(country.countryRegion, country.lat, country.long));
      });
      this.worldDataArrayLocations = _.uniqBy(arrayLocations, (o) => {
        return o.name;
      });
      this.zone.runOutsideAngular(() => {
        this.drawPlanet();
      });
      this.showSpinner = false;
    });
  }


  openBottomSheet(data): void {
    this.bottomSheet.open(BottomSheetComponent, {data});
  }

  ngAfterViewInit() {
  }


  drawPlanet() {
    const locations = this.worldDataArrayLocations;
    const globe = planetaryjs.planet();

    globe.loadPlugin(planetaryjs.plugins.autocenter({window}));
    globe.loadPlugin(autorotate(10));

    globe.loadPlugin(planetaryjs.plugins.earth({
      topojson: {file: '../../../assets/world-110m.json'},
      oceans: {fill: '#e9e9e9'},
      land: {fill: '#383838'},
      borders: {stroke: '#4c4c4c'}
    }));

    globe.loadPlugin(planetaryjs.plugins.pings());

    globe.loadPlugin(planetaryjs.plugins.zoom({
      scaleExtent: [100, 2000]
    }));
    globe.loadPlugin(planetaryjs.plugins.drag({

      onDragStart() {
        this.plugins.autorotate.pause();
      },
      onDragEnd() {
        this.plugins.autorotate.pause();
        // this.plugins.autorotate.resume();
      },
      afterDrag() {
        this.plugins.autorotate.pause();
      }
    }));

    globe.loadPlugin(planetaryjs.plugins.pingMarkers('#rotatingGlobe', {
      color: 'white',
      angle: 2,
      randomTtl: {
        enabled: true,
        min: 1500,
        max: 2000
      },
      errorMargin: 1.5,
      zoomAngle: {
        enabled: true,
        min: 3,
        max: 0.5,
        onZoom: 'default'
      }
    }));

    globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

    const colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];

    const canvas: any = document.getElementById('rotatingGlobe');
    if (window.devicePixelRatio === 2) {
      canvas.width = 800;
      canvas.height = 800;
      const context = canvas.getContext('2d');
      context.scale(2, 2);
    }

    globe.draw(canvas);

    locations.forEach((value, index) => {
      globe.plugins.pingMarkers.add(locations[index].long, locations[index].lat);
    });


    $(globe.plugins.pingMarkers).on('click', (event, data) => {
      this.zone.run(() => {
        this.onClick.emit(data);
      });
    });


    function autorotate(degPerSec) {
      return (planet) => {
        let lastTick: any = null;
        let paused = false;
        planet.plugins.autorotate = {
          pause: () => {
            paused = true;
          },
          resume: () => {
            paused = false;
          }
        };

        planet.onDraw(() => {
          if (paused || !lastTick) {
            lastTick = new Date();
          } else {
            const now: any = new Date();
            const delta = now - lastTick;

            const rotation = planet.projection.rotate();
            rotation[0] += degPerSec * delta / 1000;
            if (rotation[0] >= 180) {
              rotation[0] -= 360;
            }
            planet.projection.rotate(rotation);
            lastTick = now;
          }
        });
      };
    }
  }


  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}




