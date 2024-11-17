import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../models/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

   http={};
  constructor(private httpClient:HttpClient) {
    this.http={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
   }
  addNewUser(user:Iuser):Observable<Iuser>{
      return this.httpClient.post<Iuser>(`http://127.0.0.1:5000/users`,JSON.stringify(user),this.http);
  }

  fetchUserDetails(payload: { email: string; password: string; }) {
    return this.httpClient.post<any>("http://127.0.0.1:5000/fetchUser",payload,this.http);
  }

}
