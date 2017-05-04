import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SedentaryComponent } from './sedentary.component';

describe('SedentaryComponent', () => {
  let component: SedentaryComponent;
  let fixture: ComponentFixture<SedentaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SedentaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
