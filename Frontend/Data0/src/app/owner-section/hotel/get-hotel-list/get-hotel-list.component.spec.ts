import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHotelListComponent } from './get-hotel-list.component';

describe('GetHotelListComponent', () => {
  let component: GetHotelListComponent;
  let fixture: ComponentFixture<GetHotelListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetHotelListComponent]
    });
    fixture = TestBed.createComponent(GetHotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
