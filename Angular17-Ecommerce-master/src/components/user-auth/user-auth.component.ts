import { Component } from '@angular/core';
import { UserAuthenService } from '../../Services/user-auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {
  isUser:boolean = true;
  email:string='';
  pass:string='';
  constructor(private userAuth: UserAuthenService,
    private router:Router
  ) {
    this.isUser= this.userAuth.isUserLogged
  }

  ngOnInit() :void {
    this.logoutFunc();
  }

  loginFunc() {
    this.userAuth.login(this.email,this.pass);
    
  }

  logoutFunc() {
    this.userAuth.logout();
    localStorage.removeItem('cart');
  }
  
}
