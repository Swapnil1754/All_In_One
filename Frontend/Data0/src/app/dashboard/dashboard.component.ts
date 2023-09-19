import { Component } from '@angular/core';
import { LoginServiceService } from '../Services/login-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
constructor(private login: LoginServiceService, private router: Router){}
logOut(){
  alert("Hi")
  this.login.logout();
  this.router.navigate(['login']);
}
}
