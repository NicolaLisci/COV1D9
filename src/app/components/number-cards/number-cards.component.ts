import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss']
})
export class NumberCardsComponent implements OnInit {

  public cardColor = '#FFFFFF';
  public colorScheme = {
    domain: ['#5AA454', '#E44D25', '#44BBA4', '#7aa3e5', '#a8385d', '#8963BA', '#FED02F', '#90949A', '#AF9B46', '#000000']
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
