import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, map, mergeMap, of, shareReplay, tap } from 'rxjs';
import { Reg } from '../Domain/General-Domain/Reg';
import { Login } from '../Domain/General-Domain/Login';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Account } from '../Domain/General-Domain/Account';
import { StateStorageService } from './Auth/state-storage.service';
import { Router } from '@angular/router';
import {HttpParams} from '@angular/common/http';
type JwtToken={
  token:string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private accountCache$?: Observable<Account> | null;
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  
  constructor(
    private httpclient:HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private stateStorageService: StateStorageService,
    private router: Router
    ) { }
  url="http://localhost:9000/api/v1/login";
  url1="http://localhost:9000/api/v1";
  url2="http://localhost:9000/api";
  register(data:Reg):Observable<Reg>{
    return this.httpclient.post<Reg>(`${this.url1}/${"register"}`,data);
  }
  login(data:number,pass:FormData,remember:Login):Observable<Account | null>{
    return this.httpclient.post<any>(`${this.url}/${data}`,pass).
    pipe(map(response => this.authenticateUser(response.token, remember.rememberMe))).pipe(mergeMap(() => this.identity(data, true)));
  }
  googleLogin(googleToken):Observable<Account | null> {
    const queryParams = new HttpParams().set('token', googleToken)
    console.log("Sanity", queryParams)
    return this.httpclient.get<any>(`${this.url1}/${"google"}`, {params: queryParams});
  }
  fbLogin(name):Observable<Account | null> {
    const qParam = new HttpParams().set('name', name);
    console.log("name", name)
    return this.httpclient.get<any>(`${this.url1}/${"facebook"}`, {params: qParam});
  }
  authenticateUser(response: any, rememberMe: boolean):void {
  
    const jwt = response;
    if(rememberMe) {
      console.log("token1",jwt);
      this.localStorageService.store('authenticationToken', jwt);
      this.sessionStorageService.clear('authenticationToken');
    } else{
      console.log("token2", jwt);
      this.sessionStorageService.store('authenticationToken', jwt);
      this.localStorageService.clear('authenticationToken');
    }
  }
   identity(data?: any,force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force && data!=null) {
      this.accountCache$ = this.fetch(data).pipe(
        tap((account: Account) => {
          this.authenticate(account);

          this.navigateToStoredUrl();
        }),
        shareReplay()
      );
    
  }
    return this.accountCache$.pipe(catchError(() => of(null)));
  }
   authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    console.log("id1", this.userIdentity);
    this.authenticationState.next(identity);
    if(!identity) {
        this.accountCache$ = null;
    }
  }
  private fetch(data: any): Observable<Account> {
    if(data!=null){
    let x = this.httpclient.get<Account>(`${this.url1}/${"fetch"}/${data}`);
    if(x!==null){
      x.subscribe(a=>{
        let b = a.userId;
        console.log("id2", b);
        localStorage.setItem("userIdentity", b);
      })
    }
    return x;
  }else{
    return new Observable<Account>;
  }
  }
  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
  isAuthenticated(): boolean {
    let userIdentity = localStorage.getItem("userIdentity")
    if(userIdentity!==null) {
      console.log("id", userIdentity)
      return true;
    }else{ 
      console.log("else", userIdentity)
      return false;
    }
  }

  out(): Observable<void> {
    return new Observable(observer =>{
      this.localStorageService.clear();
      this.sessionStorageService.clear();
      localStorage.removeItem("userIdentity");
      observer.complete();
    })
  }
  logout(): void{
    this.out().subscribe({ complete: () => this.authenticate(null)})
  }
}
