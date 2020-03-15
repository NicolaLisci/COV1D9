import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import {Chart} from '../../models/chart.model';
import {ChartEvent} from 'angular-google-charts';

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
  width: number[];
  height: number;

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.todayDate = this.utilsService.getLastRecord();


    this.apiService.getRegionsData(this.todayDate).subscribe((res: any) => {
      this.features = res.features;
      this.features.forEach(region => {
        const regionArray = [];
        regionArray.push(region.properties.regione);
        regionArray.push(region.properties.guariti);
        this.data.push(regionArray);
      });

      this.chartData = this.setChart(this.data);
    });

  }

  ngAfterViewInit(): void {
  }

  setChart(data: any): Chart {
    const mychart: Chart = {
      type: 'GeoChart',
      data,
      options: {
        region: 'IT',
        displayMode: 'markers',
        colorAxis: {colors: ['#46127A', '#1102BB']},
        backgroundColor: '#172142',
        datalessRegionColor: 'white',
        dynamicResize: true
      }
    };
    return mychart;
  }


  onSelect($event: ChartEvent) {
    console.log($event);
  }

  onResize(event) {
    console.log('resize');
    this.width = [event.target.innerWidth - 900, 280];
    this.chartData = this.setChart(this.data);
  }
}
