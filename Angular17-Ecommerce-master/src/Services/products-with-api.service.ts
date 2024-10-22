import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduct from '../models/IProduct';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductsWithApiService {
 http={};
  constructor(private httpclient: HttpClient) {
    this.http={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
  }


  getAllPrds():Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`http://localhost:3000/products`)
  }

 getPrdByID(prdID:number):Observable<IProduct>{
    return this.httpclient.get<IProduct>(`http://localhost:3000/products?id=${prdID}`);
  }
 getPrdBycatID(catID:number):Observable<IProduct>{
    return this.httpclient.get<IProduct>(`http://localhost:3000/products?id=${catID}`);
  }
  addNewProduct(product:IProduct):Observable<IProduct>{
    return this.httpclient.post<IProduct>(`http://localhost:3000/products`,JSON.stringify(product),this.http);
  }
   deleteProduct(prdID: number): Observable<void> {
    return this.httpclient.delete<void>(`http://localhost:3000/products/${prdID}`,this.http);
  }

  updateProduct(prdID: number, updatedProduct: IProduct): Observable<IProduct> {
    return this.httpclient.put<IProduct>(`http://localhost:3000/products/${prdID}`, JSON.stringify(updatedProduct),this.http);
  }
}
