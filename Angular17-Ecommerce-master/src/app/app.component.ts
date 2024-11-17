import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProductsParentComponent } from '../components/products-parent/products-parent.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecommendedProductComponent } from '../components/recommended-product/recommended-product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsComponent, HeaderComponent,FooterComponent,ProductsParentComponent,FormsModule,CommonModule,RecommendedProductComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
}
