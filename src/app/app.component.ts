import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Inject, OnInit} from '@angular/core';
import {PwaService} from './services/pwa.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DOCUMENT} from '@angular/common';

declare function addToHomescreen();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Document],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'COV1D9';
  public showInstructions: boolean;

  constructor(
    public pwaService: PwaService,
    private matSnackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.showInstructions = true;
    setTimeout(() => {
      this.showInstructions = false;
      this.changeDetectorRef.detectChanges();
    }, 8000);

    addToHomescreen();
    if (this.pwaService.promptEvent) {
      this.matSnackBar.open('Installa l\'app per un\' esperienza migliore', 'Installa');
    }
  }


  installPwa(): void {
    this.matSnackBar.open('Installazione...', '', {duration: 2000});
    this.pwaService.promptEvent.prompt();
  }


  ngAfterViewChecked(): void {
    if (this.document.getElementById('install')) {
      this.document.getElementById('install').addEventListener('click', ev => {
        this.installPwa();
      });
    }
  }

  dismissInstructions() {
    this.showInstructions = false;
    this.changeDetectorRef.detectChanges();
  }
}
