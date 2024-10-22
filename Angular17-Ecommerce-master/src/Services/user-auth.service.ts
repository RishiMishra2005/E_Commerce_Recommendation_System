import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenService {
  userLoggedBehavior: BehaviorSubject<boolean>;
  userList:Iuser[]=[];
  data:any;
  constructor() {
    this.userLoggedBehavior = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  login(userEmail: string, userPassword: string) {
    this.data=localStorage.getItem("userList");
    this.userList =this.data?JSON.parse(this.data):[];
    console.log(this.userList);
    let userFound=false;
    if(this.userList){
      this.userList.forEach(x => {
        if(x.email==userEmail && x.password==userPassword){
          localStorage.setItem("loggedUser",JSON.stringify(x));
          this.userLoggedBehavior.next(true);
          userFound=true;
        }
      });
    }
    return userFound;

  }
  logout(){
    localStorage.removeItem("loggedUser");
    this.userLoggedBehavior.next(false);
  }

  get isUserLogged(): boolean {
    return localStorage.getItem("loggedUser") ? true : false;
  }
  getUserLoggedStatus():Observable<boolean> {

    return this.userLoggedBehavior.asObservable();
  }
}
