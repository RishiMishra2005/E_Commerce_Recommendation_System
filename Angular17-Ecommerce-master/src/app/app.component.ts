import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProductsParentComponent } from '../components/products-parent/products-parent.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecommendedProductComponent } from '../components/recommended-product/recommended-product.component';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    ProductsParentComponent,
    FormsModule,
    CommonModule,
    RecommendedProductComponent,
    ChatbotComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected typo from styleUrl to styleUrls
})
export class AppComponent {
  title = 'my-app';

  // ngOnInit(): void {
  //   // Delay the script loading to ensure Angular has fully initialized.
  //   setTimeout(() => {
  //     this.loadScript('https://cdn.botpress.cloud/webchat/v2.2/inject.js');
  //     this.loadScript('https://files.bpcontent.cloud/2024/10/28/15/20241028155622-AVYBNMZE.js');
  //   }, 1000); // Delay by 1 second (adjust if necessary)
  // }

  // loadScript(src: string): void {
  //   // Check if the script is already loaded to avoid duplicates.
  //   if (!document.querySelector(`script[src="${src}"]`)) {
  //     const script = document.createElement('script');
  //     script.src = src;
  //     script.async = true;
  //     script.onload = () => console.log(`Script loaded: ${src}`);
  //     script.onerror = () => console.error(`Failed to load script: ${src}`);
  //     document.body.appendChild(script);
  //   } else {
  //     console.log(`Script already loaded: ${src}`);
  //   }
  // }
}
