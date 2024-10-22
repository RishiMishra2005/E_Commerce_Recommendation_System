import { Injectable } from '@angular/core';
import IProduct from '../models/IProduct';
import ICategory from '../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private product: IProduct[];
  // productList: IProduct[]= [];
  category: ICategory[];
  filteredProducts: IProduct[] = [];
  constructor() {
      this.product =[
      {
        id: 1,
        Name: 'HP 15.6" HD Chromebook Laptop, Intel Pentium Silver N6000, 8GB RAM, 128GB eMMC',
        Quantity: 10,
        Price: 329.00,
        Img: 'https://i5.walmartimages.com/seo/HP-15-6-HD-Chromebook-Laptop-Intel-Pentium-Silver-N6000-8GB-RAM-128GB-eMMC-Mineral-Silver-15a-na0058wm_2cb9f52d-a189-451a-abbf-5bb604291552.a484006c7e4c615d975d7a855575714e.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        Categoryid: 1,
        Factory:"HP",
        Description: 'HP 15.6" HD Chromebook Laptop, Intel Pentium Silver '
      },
      {
        id: 2,
        Name: 'HP 15.6" FHD Touch Laptop, AMD Ryzen 7 5700U, 16GB RAM, 512GB SSD, Silver, Win 11 Home, 15-ef2747wm',
        Quantity: 1,
        Price: 449.00,
        Img: 'https://i5.walmartimages.com/seo/HP-15-6-FHD-Touch-Laptop-AMD-Ryzen-7-5700U-16GB-RAM-512GB-SSD-Silver-Win-11-Home-15-ef2747wm_fe85eb3e-85f9-4ab1-b210-289f86a1af55.71be27342cf976835a4376f490abd489.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        Categoryid: 2,
        Factory:"HP",
        Description: 'HP 15.6" HD Chromebook Laptop, Intel Pentium Silver '
      },
      {
        id: 3,
        Name: 'ASUS ROG Strix G17 (2023) 17.3” QHD 240Hz Gaming Laptop, Ryzen 9-7845HX, NVidIA GeForce RTX 4060',
        Quantity: 8,
        Price: 1399.00,
        Img: 'https://i5.walmartimages.com/seo/ASUS-ROG-Strix-G17-2023-17-3-QHD-240Hz-Gaming-Laptop-Ryzen-9-7845HX-NVidIA-GeForce-RTX-4060-16GB-DDR5-RAM-1TB-SSD-Windows-11-G713PV-WS94_dd9a9828-782f-4e71-a59f-85943c63380c.b0cc5a7257235cf445428d7961b7a290.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        Categoryid: 2,
        Factory:"ASUS",
        Description: 'ASUS ROG Strix G17 (2023) 17.3'
      },
      {
        id: 4,
        Name: 'ASUS Vivobook 16” PC Laptop, Intel Core i7-1255U, 16GB, 512GB, Win 11 Home, Black, F1605ZA-WS74',
        Quantity: 15,
        Price: 499.00,
        Img: 'https://i5.walmartimages.com/seo/ASUS-Vivobook-16-PC-Laptop-Intel-Core-i7-1255U-16GB-512GB-Win-11-Home-Black-F1605ZA-WS74_2ca09af0-253d-4c95-9ac1-3aa5a9ace260.0fb0c855cfe18be938c38174863f87ba.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        Categoryid: 1,
        Factory:"ASUS",
        Description: 'ASUS Vivobook 16” PC Laptop, Intel Core i7-125'
      },
      {
        id: 5,
        Name: 'ASUS Vivobook 14" HD Laptop, Intel Core i3-1115G4 Processor, 16GB RAM, 512GB SSD, Intel UHD Graphics 770, Bluetooth, Webcam, Windows 11 Home, Cefesfy Multifunctional Brush',
        Quantity: 0,
        Price: 399.99,
        Img: 'https://i5.walmartimages.com/seo/ASUS-Vivobook-14-HD-Laptop-Intel-Core-i3-1115G4-Processor-16GB-RAM-512GB-SSD-UHD-Graphics-770-Bluetooth-Webcam-Windows-11-Home-Cefesfy-Multifunctiona_32aa1428-535b-4d0d-8fc5-12173fd7f089.aff66dd8ef57d18e5bd10ef2098ab7b4.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        Categoryid: 1,
        Factory:"ASUS",
        Description: 'ASUS Vivobook 14" HD Laptop, Intel Core i3-111'
      },
        {
        id: 6,
        Name: 'ASUS Vivobook 2-in-1 Touchscreen 14" Laptop, Intel Celeron N4500, 4GB RAM, 64GB eMM, Intel UHD Graphics, Windows 11 in S Mode, Bundle with Cefesfy SUBDEB',
        Quantity: 25,
        Price: 280.99,
        Img: 'https://i5.walmartimages.com/seo/ASUS-Vivobook-2-in-1-Touchscreen-14-Laptop-Intel-Celeron-N4500-4GB-RAM-64GB-eMM-UHD-Graphics-Windows-11-S-Mode-Bundle-Cefesfy-USBHUB_007f0b4a-289f-4ad1-a3b2-106e541ec29f.ef084fad9d246aee8968513a50dd3d12.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        Categoryid: 1,
        Factory:"ASUS",
        Description: 'ASUS Vivobook 2-in-1 Touchscreen 14'
      },
        {
        id: 7,
        Name: 'MSI GE Series - 17.3" 144 Hz IPS - Intel Core i9 12th Gen 12900H (2.50GHz) - NVidIA GeForce RTX 3060 Laptop GPU - 16 GB DDR5 - 1 TB PCIe SSD - Windows 11 Home 64-bit - Gaming Laptop (Raider GE76 12UE-',
        Quantity: 30,
        Price: 1099.99,
        Img: 'https://i5.walmartimages.com/seo/MSI-GE-Series-17-3-144-Hz-IPS-Intel-Core-i9-12th-Gen-12900H-2-50GHz-NVidIA-GeForce-RTX-3060-Laptop-GPU-16-GB-DDR5-1-TB-PCIe-SSD-Windows-11-Home-64-bi_809f53bb-de79-4c73-bb2f-b6330b2c2a1b.05d59b1e8c288a6a38ee859bc96df7b7.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
          Categoryid: 1,
        Factory:"MSI", 
        Description: 'HP 15.6" HD Chromebook Laptop, Intel Pentium Silver '
      },
        {
        id: 8,
        Name: 'MSI Katana 15.6" Gaming Laptop, 144Hz FHD, Intel Core i7-13620H, NVidIA GeForce RTX 4060 8GB, 16GB DDR5 Memory, 1TB NVMe SSD, Windows 11, Black, B13VFK-817US',
        Quantity: 50,
        Price: 999.00,
        Img: 'https://i5.walmartimages.com/seo/MSI-Katana-15-6-Gaming-Laptop-144Hz-FHD-Intel-Core-i7-13620H-NVidIA-GeForce-RTX-4060-8GB-16GB-DDR5-Memory-1TB-NVMe-SSD-Windows-11-Black-B13VFK-817US_19d1ab0a-edde-44d9-826c-b8e9798ae11b.2ccb79676bb85cefcb7bb917dcbef1cc.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        Categoryid: 1,
        Factory:"MSI",
        Description: 'MSI Katana 15.6" Gaming Laptop, 144Hz F'
      },
    ];
      this.category = [
    { ID: 1, Name: 'Laptop' },
    { ID: 2, Name: 'Tablet' },
    { ID: 3, Name: 'Mobile' },
  ];
  }

// getProductsByCategory(filterValue: string): IProduct[] {
//   console.log(filterValue);
//   const categoryid = parseInt(filterValue, 10);
//   return this.filteredProducts = this.product.filter((product: IProduct) => product.Categoryid === categoryid);
  //   }

  applyFilter(minPrice?: number, maxPrice?: number): IProduct[] {
    console.log("Inside applyFilter")
  return this.product.filter((product: IProduct) =>
    (!minPrice || product.Price >= minPrice) &&
    (!maxPrice || product.Price <= maxPrice)
  );
  }



  getAllPrd(): IProduct[] {
    console.log("Inside getALlprd");
    return this.product;
  }
  getProductsByCatid(catid: number): IProduct[] {
    return this.product.filter((product) => product.Categoryid === catid);
  }

  getProductByid(prodid: number): IProduct | undefined {
    return this.product.find((product) => product.id === prodid);
  }

 getPrdIDSList():number[]{

    return this.product.map(prd=>prd.id);
  }

}
