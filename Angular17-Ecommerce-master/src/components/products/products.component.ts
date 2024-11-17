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
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, ImgStyleDirectiveDirective, FormatPaymentPipe,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // product: IProduct[];
  isPurchased: boolean = false;
  selectedItem: IProduct | null = null;
  filteredProducts: IProduct[] = [];
  productsPriceFilter: IProduct[] = [];
  product: IProduct[] = [];
  @Input() set listFilterValueInchild(value: number) {
    //console.log(value);
    this.productsPriceFilter = this.prdService.applyFilter(value);
    // console.log(this.performFilter(value));
    //console.log(this.productsPriceFilter);
    this.productWithApiService.getAllPrds().subscribe(data => {
      this.productsPriceFilter = data.filter(prd => prd.Name.includes(value.toString()));
      //console.log(this.productsPriceFilter);
    })
  }

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
  set listFilterValue(value: number) {
    //console.log(value);
    this.productsListFilter = this.prdService.applyFilter(value);
    // console.log(this.productsListFilter);
  }
    constructor(public prdService:ServicesService, private router:Router , private productWithApiService:ProductsWithApiService,
      private dataTransferService:DataTransferServiceService
    ) {
    // this.product =[
    //   {
    //     ID: 1,
    //     Name: 'HP 15.6" HD Chromebook Laptop, Intel Pentium Silver N6000, 8GB RAM, 128GB eMMC',
    //     Quantity: 10,
    //     Price: 329.00,
    //     Img: 'https://i5.walmartimages.com/seo/HP-15-6-HD-Chromebook-Laptop-Intel-Pentium-Silver-N6000-8GB-RAM-128GB-eMMC-Mineral-Silver-15a-na0058wm_2cb9f52d-a189-451a-abbf-5bb604291552.a484006c7e4c615d975d7a855575714e.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    //     CategoryID: 1,
    //     Factory:"HP"
    //   },
    //   {
    //     ID: 2,
    //     Name: 'HP 15.6" FHD Touch Laptop, AMD Ryzen 7 5700U, 16GB RAM, 512GB SSD, Silver, Win 11 Home, 15-ef2747wm',
    //     Quantity: 1,
    //     Price: 449.00,
    //     Img: 'https://i5.walmartimages.com/seo/HP-15-6-FHD-Touch-Laptop-AMD-Ryzen-7-5700U-16GB-RAM-512GB-SSD-Silver-Win-11-Home-15-ef2747wm_fe85eb3e-85f9-4ab1-b210-289f86a1af55.71be27342cf976835a4376f490abd489.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    //     CategoryID: 2,
    //     Factory:"HP"
    //   },
    //   {
    //     ID: 3,
    //     Name: 'ASUS ROG Strix G17 (2023) 17.3” QHD 240Hz Gaming Laptop, Ryzen 9-7845HX, NVIDIA GeForce RTX 4060',
    //     Quantity: 8,
    //     Price: 1399.00,
    //     Img: 'https://i5.walmartimages.com/seo/ASUS-ROG-Strix-G17-2023-17-3-QHD-240Hz-Gaming-Laptop-Ryzen-9-7845HX-NVIDIA-GeForce-RTX-4060-16GB-DDR5-RAM-1TB-SSD-Windows-11-G713PV-WS94_dd9a9828-782f-4e71-a59f-85943c63380c.b0cc5a7257235cf445428d7961b7a290.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    //     CategoryID: 2,
    //     Factory:"ASUS"
    //   },
    //   {
    //     ID: 4,
    //     Name: 'ASUS Vivobook 16” PC Laptop, Intel Core i7-1255U, 16GB, 512GB, Win 11 Home, Black, F1605ZA-WS74',
    //     Quantity: 15,
    //     Price: 499.00,
    //     Img: 'https://i5.walmartimages.com/seo/ASUS-Vivobook-16-PC-Laptop-Intel-Core-i7-1255U-16GB-512GB-Win-11-Home-Black-F1605ZA-WS74_2ca09af0-253d-4c95-9ac1-3aa5a9ace260.0fb0c855cfe18be938c38174863f87ba.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    //     CategoryID: 1,
    //     Factory:"ASUS"
    //   },
    //   {
    //     ID: 5,
    //     Name: 'ASUS Vivobook 14" HD Laptop, Intel Core i3-1115G4 Processor, 16GB RAM, 512GB SSD, Intel UHD Graphics 770, Bluetooth, Webcam, Windows 11 Home, Cefesfy Multifunctional Brush',
    //     Quantity: 0,
    //     Price: 399.99,
    //     Img: 'https://i5.walmartimages.com/seo/ASUS-Vivobook-14-HD-Laptop-Intel-Core-i3-1115G4-Processor-16GB-RAM-512GB-SSD-UHD-Graphics-770-Bluetooth-Webcam-Windows-11-Home-Cefesfy-Multifunctiona_32aa1428-535b-4d0d-8fc5-12173fd7f089.aff66dd8ef57d18e5bd10ef2098ab7b4.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    //     CategoryID: 1,
    //     Factory:"ASUS"
    //   },
    //     {
    //     ID: 6,
    //     Name: 'ASUS Vivobook 2-in-1 Touchscreen 14" Laptop, Intel Celeron N4500, 4GB RAM, 64GB eMM, Intel UHD Graphics, Windows 11 in S Mode, Bundle with Cefesfy SUBDEB',
    //     Quantity: 25,
    //     Price: 280.99,
    //     Img: 'https://i5.walmartimages.com/seo/ASUS-Vivobook-2-in-1-Touchscreen-14-Laptop-Intel-Celeron-N4500-4GB-RAM-64GB-eMM-UHD-Graphics-Windows-11-S-Mode-Bundle-Cefesfy-USBHUB_007f0b4a-289f-4ad1-a3b2-106e541ec29f.ef084fad9d246aee8968513a50dd3d12.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    //     CategoryID: 1,
    //     Factory:"ASUS"
    //   },
    //     {
    //     ID: 7,
    //     Name: 'MSI GE Series - 17.3" 144 Hz IPS - Intel Core i9 12th Gen 12900H (2.50GHz) - NVIDIA GeForce RTX 3060 Laptop GPU - 16 GB DDR5 - 1 TB PCIe SSD - Windows 11 Home 64-bit - Gaming Laptop (Raider GE76 12UE-',
    //     Quantity: 30,
    //     Price: 1099.99,
    //     Img: 'https://i5.walmartimages.com/seo/MSI-GE-Series-17-3-144-Hz-IPS-Intel-Core-i9-12th-Gen-12900H-2-50GHz-NVIDIA-GeForce-RTX-3060-Laptop-GPU-16-GB-DDR5-1-TB-PCIe-SSD-Windows-11-Home-64-bi_809f53bb-de79-4c73-bb2f-b6330b2c2a1b.05d59b1e8c288a6a38ee859bc96df7b7.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
    //       CategoryID: 1,
    //     Factory:"MSI"
    //   },
    //     {
    //     ID: 8,
    //     Name: 'MSI Katana 15.6" Gaming Laptop, 144Hz FHD, Intel Core i7-13620H, NVIDIA GeForce RTX 4060 8GB, 16GB DDR5 Memory, 1TB NVMe SSD, Windows 11, Black, B13VFK-817US',
    //     Quantity: 50,
    //     Price: 999.00,
    //     Img: 'https://i5.walmartimages.com/seo/MSI-Katana-15-6-Gaming-Laptop-144Hz-FHD-Intel-Core-i7-13620H-NVIDIA-GeForce-RTX-4060-8GB-16GB-DDR5-Memory-1TB-NVMe-SSD-Windows-11-Black-B13VFK-817US_19d1ab0a-edde-44d9-826c-b8e9798ae11b.2ccb79676bb85cefcb7bb917dcbef1cc.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    //     CategoryID: 1,
    //     Factory:"MSI"
    //   },
    // ];

  // this.category = [
  //   { ID: 1, Name: 'Laptop' },
  //   { ID: 2, Name: 'Tablet' },
  //   { ID: 3, Name: 'Mobile' },
  // ];
  console.log(this.productsListFilter);
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
    let payload={
      "user_id":this.dataTransferService.getLoggedUser()?.id,
      "product_id":prdID
    }
    this.productWithApiService.viewProduct(payload).subscribe({
      next : (response) =>{
        this.router.navigate(['/prd',prdID]);
      },
      error : (error) =>{
        console.log("Error while saving interaction");
        this.router.navigate(['/prd',prdID]);
      }
    })
    
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
   recommendedProducts: IProduct[] = [];
  ngOnInit() {
    // this.productsListFilter = this.product;
    // this.productsPriceFilter = this.product;
    // this.prdService.getAllPrd();
    //  this.productsPriceFilter = this.prdService.getAllPrd();
    // console.log(this.productsListFilter);
    this.productWithApiService.getAllPrds().subscribe({
       next:(data)=>{
        //console.log(data);
        this.productsPriceFilter=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })


    // new
    //this.fetchRecommendations();
  }

  fetchRecommendations(): void {
    let user_id=this.dataTransferService.getLoggedUser()?.id;
    this.productWithApiService.getPersonalRecommendations(user_id).subscribe(
      (products) => {
        this.recommendedProducts = products;
      },
      (error) => {
        console.error('Error fetching recommendations', error);
      }
    );
  }
}
