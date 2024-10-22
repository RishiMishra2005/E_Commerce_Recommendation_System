import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import IProduct from '../../models/IProduct';
import { Router } from '@angular/router';
import { UserAuthenService } from '../../Services/user-auth.service';
import { Store } from '../../models/Store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartList:IProduct[]=[];
  store = new Store("mainStore", ["product1", "product2"], "../../assets/pngegg.png")
  userLog: boolean = false;
  constructor( private userAuth:UserAuthenService,
    private router:Router
  ) {
  }
  ngOnInit(){
    this.userAuth.getUserLoggedStatus().subscribe({
      next: (user) => {
        this.userLog = user
        if(this.userLog){
          let cart=localStorage.getItem("cart") || "[]";
          this.cartList=JSON.parse(cart);
        }else{
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
    
  }
}
