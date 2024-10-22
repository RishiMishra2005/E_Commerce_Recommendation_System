import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import IProduct from '../../models/IProduct';
import { ServicesService } from '../../Services/services.service';
import { ProductsWithApiService } from '../../Services/products-with-api.service';

@Component({
  selector: 'app-products-parent',
  templateUrl: './products-parent.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule,ProductsComponent],
  styleUrls: ['./products-parent.component.css']
})
export class ProductsParentComponent {
listFilterValue :number = 0
  constructor(public prdService:ServicesService , productWithApiService:ProductsWithApiService) {  }
   cart: IProduct[] = [];
  addFunc(product: IProduct) {
    const existingProductIndex = this.cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].Quantity++;
    } else {
      const productToAdd = { ...product, Quantity: 1 };
      this.cart.push(productToAdd);
      console.log(productToAdd);
    }
  }

  calculateTotalPrice(item: IProduct): number {
    return item.Price * item.Quantity;
  }


  // ngOnInit() {
  //   this.prdService.getAllPrd()
  // }

}
