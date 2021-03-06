import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPanelComponent } from './request-panel.component';

describe('RequestPanelComponent', () => {
  let component: RequestPanelComponent;
  let fixture: ComponentFixture<RequestPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
