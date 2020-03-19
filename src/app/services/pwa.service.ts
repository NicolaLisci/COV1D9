import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable()
export class PwaService {
  public promptEvent: any;

  constructor(private swUpdate: SwUpdate) {
    window.addEventListener('beforeinstallprompt', event => {
      console.log(event);
      this.promptEvent = event;
    });

    swUpdate.available.subscribe(event => {
      window.location.reload();
    });
  }


}
