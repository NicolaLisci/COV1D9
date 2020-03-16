import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Daily, DailyLabel} from '../../models/italy/daily-model';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-italy',
  templateUrl: './italy.component.html',
  styleUrls: ['./italy.component.scss']
})
export class ItalyComponent implements OnInit {

  public todayDate: string;
  public showSpinner = true;
  public chartData: any[];
  @Output() dataTypeToVisualize = new EventEmitter();
  public showChart: boolean;

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {


    this.todayDate = this.utilsService.getLastRecord();
    this.getDailyRecords();
  }

  getDailyRecords() {
    this.apiService.getDailyRecords().subscribe((res: Daily[]) => {
      const dailyRecord = new Daily();
      dailyRecord.dimessi_guariti = res[0].dimessi_guariti;
      dailyRecord.deceduti = res[0].deceduti;
      dailyRecord.isolamento_domiciliare = res[0].isolamento_domiciliare;
      dailyRecord.nuovi_attualmente_positivi = res[0].nuovi_attualmente_positivi;
      dailyRecord.ricoverati_con_sintomi = res[0].ricoverati_con_sintomi;
      dailyRecord.terapia_intensiva = res[0].terapia_intensiva;
      dailyRecord.totale_ospedalizzati = res[0].totale_ospedalizzati;
      dailyRecord.totale_attualmente_positivi = res[0].totale_attualmente_positivi;
      dailyRecord.totale_casi = res[0].totale_casi;
      dailyRecord.tamponi = res[0].tamponi;
      this.setDataToChart(dailyRecord);
      this.showSpinner = false;
    });
  }

  setDataToChart(dailyRecord: Daily) {
    const chartArray = [];
    Object.keys(dailyRecord).forEach(key => {
      const record = {
        name: DailyLabel[key],
        value: dailyRecord[key]
      };
      chartArray.push(record);
    });
    this.chartData = chartArray;
  }

  updateChart($event: any) {
    this.dataTypeToVisualize.emit($event.name);
  }

  mapLoaded($event: any) {
    setTimeout(() => {
      this.showChart = $event;
    }, 2000);
  }

}
