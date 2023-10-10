import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './Register/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field'
import { CommonModule } from '@angular/common';
import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { LoginComponent } from './Register/login/login.component';
import { HotelComponent } from './owner-section/hotel/add-hotel/hotel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BusComponent } from './owner-section/bus/bus.component';
import { TrainComponent } from './owner-section/train/train.component';
import { FlightComponent } from './owner-section/flight/flight.component';
import { HolidaysComponent } from './owner-section/holidays/holidays.component';
import { RestaurantsComponent } from './owner-section/restaurants/restaurants.component';
import { AddMenuComponent } from './owner-section/hotel/add-menu/add-menu.component';
import { AddRoomComponent } from './owner-section/hotel/add-room/add-room.component';
import { UpdateRoomComponent } from './owner-section/hotel/update-room/update-room.component';
import { UpdateMenuComponent } from './owner-section/hotel/update-menu/update-menu.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PasswordStrengthComponent } from './Register/Password/password-strength/password-strength.component';
// import { GoogleSignInModule } from 'angular-google-signin';
import { LocalStorageService, NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';
import { ActivateComponent } from './Register/activate/activate.component';
import { GetHotelListComponent } from './owner-section/hotel/get-hotel-list/get-hotel-list.component';
import { GetHotelComponent } from './owner-section/hotel/get-hotel/get-hotel.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ImageComponent } from './image/image.component';
import { MatCardModule } from '@angular/material/card';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HotelComponent,
    DashboardComponent,
    BusComponent,
    TrainComponent,
    FlightComponent,
    HolidaysComponent,
    RestaurantsComponent,
    AddMenuComponent,
    AddRoomComponent,
    UpdateRoomComponent,
    UpdateMenuComponent,
    PasswordStrengthComponent,
    ActivateComponent,
    GetHotelListComponent,
    GetHotelComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,CommonModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,LayoutModule,HttpClientModule,MatButtonModule,MatSidenavModule,
    MatIconModule,MatListModule,MatGridListModule,MatMenuModule,MatTabsModule,MatTooltipModule,
    MatInputModule,MatDialogModule,FlexLayoutModule,ReactiveFormsModule,MatCheckboxModule,MatRadioModule,MatChipsModule,
    MatSelectModule,MatAutocompleteModule,NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    NgxCaptchaModule, MatCardModule,
    
  ],
  providers: [
    SocialAuthService,
    {
      provide:
      'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id:
            GoogleLoginProvider.PROVIDER_ID,
            provider: new
            GoogleLoginProvider('578349732074-ddo6roou2d4o05trh2ajmevnngudc39n.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
