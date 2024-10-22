import { Component, OnInit } from '@angular/core';
import IProduct from '../../models/IProduct';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServicesService } from '../../Services/services.service';
import { CommonModule } from '@angular/common';
import { ProductsWithApiService } from '../../Services/products-with-api.service';
import { UserAuthenService } from '../../Services/user-auth.service';

@Component({
  selector: 'app-proudct-details',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './proudct-details.component.html',
  styleUrl: './proudct-details.component.scss'
})
export class ProudctDetailsComponent  implements OnInit{
  prdID:number=0;
  product: IProduct | undefined = undefined;
  prdIDList: number[] = [];
  currIndex: number = 0;
  userLog: boolean = false;

  constructor(private ProductService:ServicesService,private activatedRoute: ActivatedRoute,private router:Router, 
    private productWithApiService:ProductsWithApiService,private userAuth:UserAuthenService) {
  }

  ngOnInit(): void {
  // this.prdID= (this.activatedRoute.snapshot.paramMap.get('productID'))?Number(this.activatedRoute.snapshot.paramMap.get('productID')):0;
  //   this.product = this.ProductService.getProductByID(this.prdID);


    this.prdIDList = this.ProductService.getPrdIDSList();
    // console.log(this.prdIDList);

  this.activatedRoute.paramMap.subscribe( paramMap =>{
    this.prdID = (paramMap.get('productID')) ? Number(paramMap.get('productID')) : 0;
    this.product = this.ProductService.getProductByid(this.prdID)
     this.productWithApiService.getPrdByID(this.prdID).subscribe(
       {
          next:(data)=>{
            console.log(data);
            console.log(this.prdID);
          },
          error:(err)=>{
            console.log(err);
          }
        }
      )
    }
    )
  }

  addToCart() {
    this.userAuth.getUserLoggedStatus().subscribe({
      next: (user) => {
        this.userLog = user
        if(this.userLog){
          let c:string=localStorage.getItem('cart') || "[]";
    let cart = JSON.parse(c);
    cart.push(this.product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.router.navigate(['/cart']);
        }else{
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
    
  }
  
  goBackFunc(){
    this.router.navigate(['Products'])
  }
 previousFunc(){
     this.currIndex= this.prdIDList.indexOf(this.prdID);
    this.router.navigate(['/prd',this.prdIDList[--this.currIndex]])
  }

  nextFunc(){
    this.currIndex= this.prdIDList.indexOf(this.prdID);
    this.router.navigate(['/prd',this.prdIDList[++this.currIndex]])
  }

}
