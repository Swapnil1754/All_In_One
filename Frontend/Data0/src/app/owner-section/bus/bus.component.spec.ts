import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusComponent } from './bus.component';

describe('BusComponent', () => {
  let component: BusComponent;
  let fixture: ComponentFixture<BusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusComponent]
    });
    fixture = TestBed.createComponent(BusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
