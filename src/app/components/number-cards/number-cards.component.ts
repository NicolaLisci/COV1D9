import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss']
})
export class NumberCardsComponent implements OnInit {

  public view: any[] = [1200, 300];
  public showLegend = true;
  public showLabels = true;
  public cardColor = '#172142';
  public colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  @Input() chartData;
  @Input() showChart;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect($event: any) {
    console.log($event);
  }


}
