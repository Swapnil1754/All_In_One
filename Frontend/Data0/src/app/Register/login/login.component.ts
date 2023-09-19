import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../../Services/login-service.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
declare const FB: any;
declare const google: any;
type JwtToken={
  token:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('userId', { static: false })
  userId!: ElementRef;
  loginForm:FormGroup;
  authenticationError: boolean=false;
  constructor(private login:LoginServiceService, private router: Router, private reCaptch: ReCaptchaV3Service, private authService: SocialAuthService, private sanitizer: DomSanitizer){
    this.loginForm = new FormGroup({
      userId: new FormControl('',{ nonNullable: true, validators: [Validators.required]}),
      password: new FormControl('',{ nonNullable: true, validators: [Validators.required]}),
      rememberMe: new FormControl(false,{ nonNullable: true, validators: [Validators.required]}),
      recaptcha: new FormControl(['', Validators.required])
    });
    FB.getLoginStatus(function(response: any) {
      console.log(response.authResponse);
    });
  }
  ngOnInit(): void{
    this.login.identity().subscribe(() => {
      if(this.login.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
    google.accounts.id.initialize({
      client_id: '578349732074-ddo6roou2d4o05trh2ajmevnngudc39n.apps.googleusercontent.com',
      callback:
      this.handleGoogleSignIn
    });
  }
  ngAfterViewInit(): void {
    // this.userId.nativeElement.focus();
  }
  loginFun(){
   const data=this.loginForm.value;
   const pass = this.loginForm.get('password')?.value;
   const remember = this.loginForm.getRawValue();
    console.log("Password",pass);
   var formData = new FormData();
   formData.append("password", JSON.stringify(pass));
   if(data.userId!='' && data.password!=''){
   
    this.login.login(data.userId,formData,remember).subscribe(
      {
        next: () => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            // There were no routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['']);
          }
        },
        error: () => (this.authenticationError = true),
      }
    )  
   }
  }
  loginWithFb() {
    FB.login((response: any) => {
      if(response.authResponse) {
        const fbTok = response.authResponse.accessToken;
        this.userDetails(fbTok);
        this.router.navigate(['']);
      }
    }, { scope: 'email' });
  }
  userDetails(tok: string){
    FB.api('/me?field=email', (user) => {
      console.log("User ", user);
      const remember = this.loginForm.getRawValue();
      this.login.fbLogin(user.name).subscribe(x =>{
        this.login.authenticateUser(tok, remember);
        this.login.identity(x?.userId, remember);
      })
    })
  }
  loginWithGoogle() {
    google.accounts.id.prompt();
  }
  handleGoogleSignIn = (response: any) => {
    if(response.credential) {
      const toke = response.credential;
      this.googleToken(toke);
    }else{
      console.error('Google Sign In Failed...!!!')
    }
  }
  googleToken(gToken: string) {
    const remember = this.loginForm.getRawValue();
    this.login.googleLogin(gToken).subscribe(x =>{
      this.login.authenticateUser(gToken, remember);
      this.login.identity(x?.userId, remember);
    });
        this.authenticationError = false;
        if(!this.router.getCurrentNavigation()) {
          this.router.navigate(['']);
        }
  }
  getPlainText(v1: string):SafeHtml{
    const x = this.sanitizer.bypassSecurityTrustHtml(v1);
    return x;
  }
  logout() {
    this.login.logout();
  }
  siteKey: string="6Le3ZxUnAAAAAFVw98Yr6h6vPbt2NLrcUbhQAHQf";
  
}
