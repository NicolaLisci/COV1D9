import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Country, WorldData, WorldLabels} from '../../models/world/world.model';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {


  showSpinner: boolean;
  @Output() dataTypeToVisualize = new EventEmitter();
  public chartData: any[];

  public worldData = new WorldData();
  showChart = true;
  private countriesData: Country[];

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {

    console.log('OnInit');
    this.apiService.getCountriesData().subscribe((res: Country[]) => {
      this.countriesData = res;
    });

    this.apiService.getWorldData().subscribe((res: any) => {
      this.worldData.confirmed = res.confirmed.value;
      this.worldData.deaths = res.deaths.value;
      this.worldData.recovered = res.recovered.value;
      this.setDataToChart(this.worldData);
    });

  }

  mapLoaded($event: any) {
    setTimeout(() => {
      this.showChart = $event;
    }, 1000);

  }

  getWorldRecords() {
    // this.apiService.getWorldData().subscribe((res: Country[]) => {
    //   res.forEach((country) => {
    //     const worldRecord = new Country();
    //     worldRecord.active = country.active;
    //     worldRecord.cases = country.cases;
    //     worldRecord.critical = country.critical;
    //     worldRecord.deaths = country.deaths;
    //     worldRecord.recovered = country.recovered;
    //     worldRecord.todayCases = country.todayCases;
    //     worldRecord.todayDeaths = country.todayDeaths;
    //   });
    //
    //   this.setDataToChart(worldRecord);
    //   this.showSpinner = false;
    // });
  }

  setDataToChart(worldData: WorldData) {
    const chartArray = [];
    Object.keys(worldData).forEach(key => {
      const record = {
        name: WorldLabels[key],
        value: worldData[key]
      };
      chartArray.push(record);
    });
    this.chartData = chartArray;
    return this.chartData;
  }

  updateChart($event: any) {

  }
}
