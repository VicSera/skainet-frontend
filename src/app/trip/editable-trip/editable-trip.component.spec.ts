import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTripComponent } from './editable-trip.component';

describe('EditableTripComponent', () => {
  let component: EditableTripComponent;
  let fixture: ComponentFixture<EditableTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
