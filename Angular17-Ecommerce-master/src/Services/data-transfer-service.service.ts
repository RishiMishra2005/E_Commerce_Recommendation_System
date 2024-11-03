import { Injectable } from '@angular/core';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class DataTransferServiceService {

  constructor() { }

  loggedUser:any;

  getLoggedUser(){
    return this.loggedUser;
  }

  setLoggedUser(user:any){
    this.loggedUser=user;
  }
}
