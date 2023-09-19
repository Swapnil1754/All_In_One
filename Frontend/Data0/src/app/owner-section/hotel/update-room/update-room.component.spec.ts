import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoomComponent } from './update-room.component';

describe('UpdateRoomComponent', () => {
  let component: UpdateRoomComponent;
  let fixture: ComponentFixture<UpdateRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRoomComponent]
    });
    fixture = TestBed.createComponent(UpdateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
