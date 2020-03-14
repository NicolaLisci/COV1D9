import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public today: Date = new Date();

  constructor(
    private datePipe: DatePipe,
  ) {
  }


  getLastRecord() {
    if (this.today.getHours() < 20) {
      this.today.setDate(this.today.getDate() - 1);
    }
    return this.datePipe.transform(this.today, 'yyyy-MM-dd');
  }
}
