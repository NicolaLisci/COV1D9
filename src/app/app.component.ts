import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from './services/api.service';
import {Daily, DailyLabel} from './models/italy/daily-model';
import {UtilsService} from './services/utils.service';
import {PwaService} from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'COV1D9';


  public promptEvent: any;
  constructor(
    private pwaService: PwaService
  ) {
  }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  installPwa(): void {
    this.pwaService.promptEvent.prompt();
  }

}
