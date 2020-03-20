import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {NumberCardsComponent} from '../number-cards/number-cards.component';
import {WorldComponent} from './world.component';
import {GlobeComponent} from '../globe/globe.component';
import {BottomSheetComponent} from '../bottom-sheet/bottom-sheet.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    NumberCardsComponent,
    WorldComponent,
    BottomSheetComponent,
    GlobeComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
})
export class WorldModule {
}
