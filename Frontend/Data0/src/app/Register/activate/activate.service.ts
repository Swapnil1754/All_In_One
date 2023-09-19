import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

  constructor(private httpClient: HttpClient) { }
  url = "http://localhost:9000/api/owner"
  getKey(key:string): Observable<{}> {
    return this.httpClient.get(`${this.url}/${"activate"}`, {
      params: new HttpParams().set('key', key),
    });
  }
}
