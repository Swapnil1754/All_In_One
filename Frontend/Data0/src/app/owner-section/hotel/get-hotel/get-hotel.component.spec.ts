import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHotelComponent } from './get-hotel.component';

describe('GetHotelComponent', () => {
  let component: GetHotelComponent;
  let fixture: ComponentFixture<GetHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetHotelComponent]
    });
    fixture = TestBed.createComponent(GetHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
