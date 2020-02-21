import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InRequestsComponent } from './in-requests.component';

describe('InRequestsComponent', () => {
  let component: InRequestsComponent;
  let fixture: ComponentFixture<InRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
