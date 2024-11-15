import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import IProduct from '../../models/IProduct';
import { Router } from '@angular/router';
import { UserAuthenService } from '../../Services/user-auth.service';
import { Store } from '../../models/Store';
import { ProductsWithApiService } from '../../Services/products-with-api.service';
import { DataTransferServiceService } from '../../Services/data-transfer-service.service';

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
    private router:Router,
    private productService:ProductsWithApiService,
    private dataTransferService:DataTransferServiceService
  ) {
  }
  ngOnInit(){
    this.userAuth.getUserLoggedStatus().subscribe({
      next: (user) => {
        this.userLog = user
        if(this.userLog){
          // this.productService.fetchCartDetails(this.dataTransferService.getLoggedUser()).subscribe({
          //   next:(response)=>{
          //       if(response){
          //         this.cartList=response;
          //       }
          //   },
          //   error:(error)=>{
          //     console.error("Error while fetching cart details",error);
          //   }
          // });
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

  removeFromCart(item: IProduct) {
    // let user=this.dataTransferService.getLoggedUser();
    // let payload={
    //     'email':user.email,
    //     'product':item
    // }
    // this.productService.removeFromCart(payload).subscribe({
    //   next:(response) => {
    //     if(response){
    //       console.log(response);
    //     }
    //   }
    //   ,error :(error) => {
    //     console.log('Error while removing product',error);
    //   }
    // })
    this.cartList = this.cartList.filter(cartItem => cartItem.id !== item.id);
	  localStorage.setItem('cart', JSON.stringify(this.cartList));
  }
}
