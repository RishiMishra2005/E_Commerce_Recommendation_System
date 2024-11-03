import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iuser } from '../models/iuser';
import { UserApiService } from './user-api.service';
import { DataTransferServiceService } from './data-transfer-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenService {
  userLoggedBehavior: BehaviorSubject<boolean>;
  userList:Iuser[]=[];
  data:any;
  constructor(private userApiService:UserApiService,
    private dataTransferService:DataTransferServiceService
  ) {
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

    let payload ={
      "email":userEmail,
      "password":userPassword
    }
    
    // this.userApiService.fetchUserDetails(payload).subscribe({next:(response)=>{
    //     if(response && response.isPresent){
    //       this.dataTransferService.setLoggedUser(response);
    //       this.userLoggedBehavior.next(true);
    //       userFound=true;
    //     }
    // }
    // ,error:(error)=>{
    //   console.error('Error while fethcing user details',error);
    // }});
    return userFound;

  }
  logout(){
    localStorage.removeItem("loggedUser");
    //this.dataTransferService.setLoggedUser(null);
    this.userLoggedBehavior.next(false);
  }

  get isUserLogged(): boolean {
    return localStorage.getItem("loggedUser") ? true : false;
    //return this.dataTransferService.getLoggedUser() ? true :false;
  }
  getUserLoggedStatus():Observable<boolean> {

    return this.userLoggedBehavior.asObservable();
  }
}
