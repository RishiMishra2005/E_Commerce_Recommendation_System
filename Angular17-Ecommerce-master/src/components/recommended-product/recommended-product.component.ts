import { Component, EventEmitter, Input, Output } from '@angular/core';
import IProduct from '../../models/IProduct';
import ICategory from '../../models/ICategory';
import DiscountOffers from '../../models/enum';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImgStyleDirectiveDirective } from '../../Directives/img-style.directive.directive';
import { FormatPaymentPipe } from '../../pipes/format-payment.pipe';
import { ServicesService } from '../../Services/services.service';
import { Router, RouterModule } from '@angular/router';
import { ProductsWithApiService } from '../../Services/products-with-api.service';
import { DataTransferServiceService } from '../../Services/data-transfer-service.service';

@Component({
  selector: 'app-recommended-product',
  standalone: true,
  imports: [FormsModule, CommonModule, ImgStyleDirectiveDirective, FormatPaymentPipe,RouterModule],
  templateUrl: './recommended-product.component.html',
  styleUrl: './recommended-product.component.scss'
})
export class RecommendedProductComponent {
  isPurchased: boolean = false;
  selectedItem: IProduct | null = null;
  filteredProducts: IProduct[] = [];
  productsPriceFilter: any[] = [];
  product: IProduct[] = [];

  userform!: FormGroup;
  listdata: any;
  index: any;
  itemobj: any;

  // category: ICategory[];
  productsListFilter: IProduct[] = [];
  discount: DiscountOffers[] = [];
  NonDiscount: DiscountOffers = DiscountOffers.NoDiscount;
  TenDiscount: DiscountOffers = DiscountOffers.TenPercent
  FiveDiscount: DiscountOffers = DiscountOffers.FifteenPercent
  date: Date = new Date
  creditCardNumber: string = '0000000000000000';
 @Output() addPrdsEvent = new EventEmitter<IProduct>();
  
    constructor(public prdService:ServicesService, private router:Router , private productWithApiService:ProductsWithApiService,
      private dataTransferService:DataTransferServiceService
    ) {
      this.productWithApiService.getPersonalRecommendations(this.dataTransferService.getLoggedUser()?.id).subscribe({
        next : (response)=>{
          if(response && response.length>0){
            for (var val of response) {
              let payload={
                "prod":val.Name,
                "nbr":5
              }
              this.productWithApiService.getRecommendedProducts(payload).subscribe({
                next : (response)=>{
                  if(response && response.length>0){
                    for(var p in response){
                    this.productsPriceFilter.push(response[p]);
                    }
                    console.log(this.productsPriceFilter);
                  }
                },
                error : (error)=>{
                  console.log(error);
                }
            });
            }
          }
        },
        error : (error) => {
          console.log(error);
        }
      });
  }

  ngOninit(): void {
    
  }

// getProductsByCategory(filterValue: string): IProduct[] {
//   console.log(filterValue);
//   const categoryId = parseInt(filterValue, 10);
//   return this.filteredProducts = this.prdService..filter((product: IProduct) => product.CategoryID === categoryId);
// }

  togglePurchase(item: IProduct) {
  this.isPurchased = !this.isPurchased;
  this.selectedItem = this.isPurchased ? item : null;
  }

  buyProduct(item: IProduct) {
    if (item.Quantity > 0) {
      item.Quantity -= 1; //
      this.togglePurchase(item);
    }
  }

  addToCart(prd: IProduct) {
    // console.log(prd);
    this.addPrdsEvent.emit(prd);
  }

goPrdDetails(prdID:number) {
    this.router.navigate(['/prd',prdID]);
  }

deleteProduct(prdID: number) {
    this.productWithApiService.deleteProduct(prdID).subscribe({
      next: () => {
        alert("Product deleted" )
         this.router.navigate(["home"])
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  editProduct(prdID: number, updatedProduct: IProduct) {
    this.productWithApiService.updateProduct(prdID, updatedProduct).subscribe({
      next: (updatedProductResponse) => {
        updatedProductResponse.Name = updatedProduct.Name
        updatedProductResponse.Price = updatedProduct.Price
        updatedProductResponse.Quantity = updatedProduct.Quantity
        alert("Product updated successfully");
        this.router.navigate(["home"]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
