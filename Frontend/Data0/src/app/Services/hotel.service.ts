import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpclient:HttpClient) { }
  url="http://localhost:9000/api/hotel";
  addHotel(data:FormData):Observable<any>{
    return this.httpclient.post<any>(`${this.url}/${"add-hotel"}`,data);
  }
  getHotelByOwnerName(ownerName:any):Observable<any>{
    return this.httpclient.get<any>(`${this.url}/${"get-hotels"}/${ownerName}`);
  }
}
