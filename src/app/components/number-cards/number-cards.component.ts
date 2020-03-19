import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss']
})
export class NumberCardsComponent implements OnInit {

  public cardColor = '#FFFFFF';
  public colorScheme = {
    domain: [
      '#3d61e5',
      '#5AA454',
      '#FF0000',
      '#FED02F',
      '#44BBA4',
      '#a8385d',
      '#8963BA',
      '#90949A',
      '#AF9B46',
      '#E44D25'
    ]
  };

  @Input() chartData;
  @Input() showChart;
  @Output() changeMapData = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect($event: any) {
    this.changeMapData.emit($event);
  }


}
