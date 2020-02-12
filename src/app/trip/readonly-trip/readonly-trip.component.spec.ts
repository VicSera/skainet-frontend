import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyTripComponent } from './readonly-trip.component';

describe('ReadonlyTripComponent', () => {
  let component: ReadonlyTripComponent;
  let fixture: ComponentFixture<ReadonlyTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadonlyTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
