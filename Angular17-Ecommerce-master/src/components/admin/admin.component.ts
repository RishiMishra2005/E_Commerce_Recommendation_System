import { Component } from '@angular/core';
import IProduct from '../../models/IProduct';
import { ProductsWithApiService } from '../../Services/products-with-api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(private prdService: ProductsWithApiService, private router: Router){}
  product: IProduct = {} as IProduct;
  addProduct() {
    this.prdService.addNewProduct(this.product).subscribe({
      next: (product) => {
        console.log(product);
        this.router.navigate(["products"])
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
