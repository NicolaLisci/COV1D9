import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetComponent implements OnInit, OnDestroy {
  public numberCardData: any;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  ngOnInit() {
    this.numberCardData = [
      {
        name: 'Confermati',
        value: this.data.confirmed
      },
      {
        name: 'Guariti',
        value: this.data.recovered
      },
      {
        name: 'Deceduti',
        value: this.data.deaths
      },
      {
        name: 'Positivi',
        value: this.data.active
      },
    ];

  }

  // setDataToChart(dailyRecord: Daily) {
  //   const chartArray = [];
  //   Object.keys(dailyRecord).forEach(key => {
  //     const record = {
  //       name: DailyLabel[key],
  //       value: dailyRecord[key]
  //     };
  //     chartArray.push(record);
  //   });
  //   this.chartData = chartArray;
  // }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }


  ngOnDestroy() {
  }

}
