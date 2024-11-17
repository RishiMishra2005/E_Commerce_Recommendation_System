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
    return this.httpclient.get<IProduct[]>(`http://127.0.0.1:5000/products`)
  }

 getPrdByID(prdID:number):Observable<IProduct>{
    return this.httpclient.get<IProduct>(`http://127.0.0.1:5000/products?id=${prdID}`);
  }
 getPrdBycatID(catID:number):Observable<IProduct>{
    return this.httpclient.get<IProduct>(`http://127.0.0.1:5000/products?id=${catID}`);
  }
  addNewProduct(product:IProduct):Observable<IProduct>{
    return this.httpclient.post<IProduct>(`http://127.0.0.1:5000/products`,product,this.http);
  }
   deleteProduct(prdID: number): Observable<void> {
    return this.httpclient.delete<void>(`http://127.0.0.1:5000/products/${prdID}`,this.http);
  }

  updateProduct(prdID: number, updatedProduct: IProduct): Observable<IProduct> {
    return this.httpclient.put<IProduct>(`http://127.0.0.1:5000/products/${prdID}`, updatedProduct,this.http);
  }

  fetchCartDetails(user: any):Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(`http://127.0.0.1:5000/cart?email=${user.email}`);
  }

  addProductToCart(payload: { email: any; product: IProduct | undefined; }):Observable<any> {
    return this.httpclient.post("http://127.0.0.1:5000/cart",payload,this.http);
  }

  removeFromCart(payload:any):Observable<any> {
    return this.httpclient.delete(`http://127.0.0.1:5000/cart?email=${payload.email}&product_id=${payload.product_id}`);
  }
  // new
  getPersonalRecommendations(userId: number): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(`http://127.0.0.1:5000/personal_recommendations?user_id=${userId}`);
  }

  viewProduct(payload: { user_id: any; product_id: number; }):Observable<any> {
    return this.httpclient.post("http://127.0.0.1:5000/viewProduct",payload,this.http);
  }

  getRecommendedProducts(payload:any):Observable<any> {
    return this.httpclient.post("http://127.0.0.1:5000/recommendations",payload,this.http);
  }
  

}
