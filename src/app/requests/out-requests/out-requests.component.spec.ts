import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutRequestsComponent } from './out-requests.component';

describe('OutRequestsComponent', () => {
  let component: OutRequestsComponent;
  let fixture: ComponentFixture<OutRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
