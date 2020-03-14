import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {Daily, DailyLabel} from './models/daily-model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'COV1D9';

  public dailyRecord: Daily;

  public single: any[];
  public view: any[] = [1200, 300];

  // options
  public showLegend = true;
  public showLabels = true;

  public today: Date = new Date();
  public todayDate: string;

  public cardColor = '#232837';
  public colorScheme = {
    domain: ['#E44D25', '#5AA454', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {

    this.todayDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    console.log(this.todayDate);
    this.apiService.getDailyRecords().subscribe((res: Daily[]) => {
      // this.dailyRecord = res[0];
      const dailyRecord = new Daily();
      dailyRecord.deceduti = res[0].deceduti;
      dailyRecord.dimessi_guariti = res[0].dimessi_guariti;
      dailyRecord.isolamento_domiciliare = res[0].isolamento_domiciliare;
      dailyRecord.nuovi_attualmente_positivi = res[0].nuovi_attualmente_positivi;
      dailyRecord.ricoverati_con_sintomi = res[0].ricoverati_con_sintomi;
      dailyRecord.tamponi = res[0].tamponi;
      dailyRecord.terapia_intensiva = res[0].terapia_intensiva;
      dailyRecord.totale_attualmente_positivi = res[0].totale_attualmente_positivi;
      dailyRecord.totale_casi = res[0].totale_casi;
      dailyRecord.totale_ospedalizzati = res[0].totale_ospedalizzati;


      // deceduti = 'Deceduti',
      //   dimessi_guariti = 'Guariti',
      //   isolamento_domiciliare = 'Isolamento domiciliare',
      //   nuovi_attualmente_positivi = 'Nuovi positivi',
      //   ricoverati_con_sintomi = 'Ricoverati con sintomi',
      //   tamponi = 'Tamponi',
      //   terapia_intensiva = 'Terapia intensiva',
      //   totale_attualmente_positivi = 'Totale positivi',
      //   totale_casi = 'Totale casi',
      //   totale_ospedalizzati = 'Totale ospedalizzati',

      this.setDataToChart(dailyRecord);

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

    console.log(chartArray);
    this.single = chartArray;
  }

  onSelect($event: any) {
    console.log($event);
  }

}
