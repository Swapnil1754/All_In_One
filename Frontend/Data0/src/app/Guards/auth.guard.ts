import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../Services/login-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: LoginServiceService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.auth.isAuthenticated()) {
      console.log("xyz",this.auth.isAuthenticated())
      return true;
    }else
    alert("You Need To Login First...!!!")
    console.log("abc",this.auth.isAuthenticated())
    this.router.navigate(['login'])
     return false;
  }
  
}
