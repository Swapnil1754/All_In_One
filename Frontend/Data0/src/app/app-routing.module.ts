import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Register/login/login.component';
import { RegistrationComponent } from './Register/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotelComponent } from './owner-section/hotel/add-hotel/hotel.component';
import { AddRoomComponent } from './owner-section/hotel/add-room/add-room.component';
import { GetHotelComponent } from './owner-section/hotel/get-hotel/get-hotel.component';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'hotel',
    component: HotelComponent
  },
  {
    path: 'add-room',
    component: AddRoomComponent
  },
  {
    path: 'image',
    component: Image
  },
  {
    path: 'get-hotel',
    component: GetHotelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-hotel',
    component: HotelComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
