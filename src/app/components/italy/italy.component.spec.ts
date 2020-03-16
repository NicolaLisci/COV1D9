import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItalyComponent } from './italy.component';

describe('ItalyComponent', () => {
  let component: ItalyComponent;
  let fixture: ComponentFixture<ItalyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItalyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
