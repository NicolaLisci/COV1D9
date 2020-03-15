import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MomentModule} from 'ngx-moment';
import {DatePipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NumberCardsComponent } from './components/number-cards/number-cards.component';
import { MapComponent } from './components/map/map.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {PwaService} from './services/pwa.service';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    NumberCardsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MomentModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    MatToolbarModule,
    GoogleChartsModule.forRoot('AIzaSyCdlCJHpBbmAvm7wgRmzFypgN4gvgD2dOA'),
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatButtonModule
  ],
  providers: [
    DatePipe,
    PwaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
