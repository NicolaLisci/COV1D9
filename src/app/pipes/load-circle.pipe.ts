import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

@Pipe({
  name: 'loadCircle'
})
export class LoadCirclePipe implements PipeTransform {
  public intervalId;
  transform(value: any): any {
    const getDownloadProgress = () => {
      console.log('getDownload', this);
      if (value <= 99) {
        console.log('inside if', value);
        value = value + 1;
        return value;
      } else {
        clearInterval(this.intervalId);
      }
    };
    this.intervalId = setInterval(getDownloadProgress, 1000);


    // return new Observable(observer => {
    //   for (let progress = 0; progress <= 100; progress++) {
    //     setDelay(progress);
    //   }
    //
    //   function setDelay(i) {
    //     setTimeout(() => {
    //       observer.next(i);
    //     }, 1000);
    //   }
    // });
  }

}
