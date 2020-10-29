import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {PwaService} from './services/pwa.service';
import {MatButtonModule} from '@angular/material/button';
import {WorldModule} from './components/world/world.module';
import {MatCardModule} from '@angular/material/card';
import { InstructionsComponent } from './components/instructions/instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    InstructionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatButtonModule,
    WorldModule,
    MatCardModule
  ],
  providers: [
    DatePipe,
    PwaService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
