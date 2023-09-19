import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginServiceService } from '../../Services/login-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '../../Configuration/error.Constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements AfterViewInit {
  @ViewChild('name1', { static: false })
  name1?: ElementRef;
RegisterForm:FormGroup;
noMatch: boolean=false;
error = false;
errorEmailExists = false;
errorUserExists = false;
success = false;
constructor(private loginService:LoginServiceService){
  this.RegisterForm = new FormGroup({
    name1:new FormControl('',[Validators.required]),
    mobNo:new FormControl('',[Validators.required,mobileNoValidator()]),
    isOwner:new FormControl('',[]),
    email:new FormControl('',[Validators.required,emailValidator()]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(20),passwordValidator()]),
    confirmPassword: new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required])
  })
}
  ngAfterViewInit(): void {
    if(this.name1) {
      this.name1.nativeElement.focus();
    }
  }
regFun(){
  const {password, confirmPassword} = this.RegisterForm.getRawValue();
  if(password !== confirmPassword){
     this.noMatch = true;
     alert("Password and Confirm Password Mismatching...!!!");
  }else{
    alert("done")
  const data = this.RegisterForm.value;
  this.loginService.register(data).subscribe({ next: () => (this.success = true), error: response => this.processError(response) })
  window.location.href="/login";

}
}
private processError(response: HttpErrorResponse): void {
  if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
    this.errorUserExists = true;
  } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
    this.errorEmailExists = true;
  } else {
    this.error = true;
  }
}
}
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const valid = emailPattern.test(control.value);
    if(control.value){
    return valid ? null : { invalidEmail: true };
    }return null;
  };
}
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const passwordPattern = /^[A-Za-z+_.-]+@[0-9]{1,}$/;
    const valid = passwordPattern.test(control.value);
    if(control.value){
    return valid ? null : { invalidPassword: true}
  }return null;
}
}

export function mobileNoValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any} | null => {
    const mobileNoPattern = /[+](91)[0-9]{10}$/;
    const valid = mobileNoPattern.test(control.value);
    if(control.value){
    return valid ? null : { invalidMobileNo: true}
    }return null;
  }
}
