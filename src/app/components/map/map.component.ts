import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import {Chart} from '../../models/chart.model';
import {ChartEvent} from 'angular-google-charts';
import {RegionFields, RegionFieldsColor} from '../../models/regioni.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  public todayDate: string;

  public title = 'title';
  public type = 'GeoChart';
  private features = [];
  public chartData: any = null;
  public data = [];
  public dataToVisualize = RegionFields.guariti;

  @Input() dataTypeToVisualize = new EventEmitter();
  public columnNames = ['Regioni', RegionFields.guariti];
  private colors: string[];
  public dataType: string;
  @Output() showMap = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
    private matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.colors = ['#FFFFFF', RegionFieldsColor.guariti];

    this.todayDate = this.utilsService.getLastRecord();
    this.dataType = this.getEnumKeyByEnumValue(RegionFields, this.dataToVisualize);
    this.drawPointsOnMap(this.dataType);

    this.dataTypeToVisualize.subscribe((res) => {
      this.dataType = this.getEnumKeyByEnumValue(RegionFields, res);
      if (!this.dataType) {
        this.matSnackBar.open('Al momento questi dati non sono disponibili!', 'Esci', {
          duration: 2000,
        });
      }

      this.columnNames = ['Regioni', res];
      this.drawPointsOnMap(this.dataType);
    });
  }

  ngAfterViewInit(): void {

  }

  setChart(data: any, colors: string[]): Chart {
    const mychart: Chart = {
      type: 'GeoChart',
      data,
      options: {
        region: 'IT',
        displayMode: 'markers',
        colorAxis: {colors: colors},
        backgroundColor: '#172142',
        datalessRegionColor: 'white',
        dynamicResize: true
      }
    };
    return mychart;
  }


  onSelect($event: ChartEvent) {
  }

  drawPointsOnMap(dataType) {
    this.data = [];
    this.apiService.getRegionsData(this.todayDate).subscribe((res: any) => {
      this.features = res.features;
      this.features.forEach(region => {
        const regionArray = [];
        regionArray.push(region.properties.regione);
        regionArray.push(region.properties[dataType]);
        this.data.push(regionArray);
      });

      this.colors = ['#FFFFFF', RegionFieldsColor[dataType]];
      this.chartData = this.setChart(this.data, this.colors);
      this.showMap.emit(true);
    });
  }

  getEnumKeyByEnumValue(myEnum, enumValue) {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

}
