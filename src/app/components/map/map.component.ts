import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import {Region} from '../../models/regioni.model';
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
  // public columnNames = [
  //   [{type: 'string', role: 'data'}]
  // ];

  // public data = [
  //   ['Rome', 2761477],
  //   ['Milan', 1324110],
  //   ['Naples', 959574],
  //   ['Turin', 907563],
  // ['Palermo', 655875],
  // ['Genoa', 607906],
  // ['Bologna', 380181],
  // ['Florence', 371282],
  // ['Fiumicino', 67370],
  // ['Anzio', 52192],
  // ['Ciampino', 38262]
  // ];

  // public data = [
  //   ['City', 'Population'],
  //   ['Rome', 2761477],
  //   ['Milan', 1324110],
  //   ['Naples', 959574],
  //   ['Turin', 907563],
  //   // ['Palermo', 655875],
  //   // ['Genoa', 607906, 243.60],
  //   // ['Bologna', 380181, 140.7],
  //   // ['Florence', 371282, 102.41],
  //   // ['Fiumicino', 67370, 213.44],
  //   // ['Anzio', 52192, 43.43],
  //   // ['Ciampino', 38262, 11]
  // ];


  public dynamicResize = true;
  private features = [];
  public regionsDataArray = [];
  public regionData: Region;

  public chart: any = null;
  public data = [];

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
        // this.regionData = new Region();

        // console.log(province);
        const regionArray = [];
        regionArray.push(region.properties.regione);
        regionArray.push(region.properties.guariti);
        this.data.push(regionArray);

        // this.regionData.regione = region.properties.regione;
        // this.regionData.codice_regione = region.properties.codice_regione;
        // this.regionData.data = region.properties.data;
        // this.regionData.deceduti = region.properties.deceduti;
        // this.regionData.dimessi_guariti = region.properties.guariti;
        // this.regionData.isolamento_domiciliare = region.properties.isolamento_domiciliare;
        // this.regionData.nuovi_attualmente_positivi = region.properties.nuovi_attualmente_positivi;
        // this.regionData.ricoverati_con_sintomi = region.properties.ricoverati_con_sintomi;
        // this.regionData.stato = region.properties.stato;
        // this.regionData.tamponi = region.properties.tamponi;
        // this.regionData.terapia_intensiva = region.properties.terapia_intensiva;
        // this.regionData.totale_attualmente_positivi = region.properties.totale_attualmente_positivi;
        // this.regionData.totale_casi = region.properties.totale_casi;
        // this.regionData.totale_ospedalizzati = region.properties.totale_ospedalizzati;
        // this.regionsDataArray.push(this.regionData);
      });

      this.chart = this.setChart(this.data);

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
        datalessRegionColor: 'white'
      }
    };
    return mychart;
  }


  onSelect($event: ChartEvent) {
    console.log($event);
  }
}
