import {AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Country, WorldData, WorldLabels} from '../../models/world/world.model';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {


  showSpinner: boolean;
  @Output() dataTypeToVisualize = new EventEmitter();
  public innerHeight: number;
  public innerWidth: number;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
}
