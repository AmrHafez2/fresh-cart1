import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _HttpClient:HttpClient) { }

  getProducts(pageNum:number = 1):Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
  }


  getProductDetails(id:string):Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getCategories():Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  getCategoryDetails(id:string):Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
  getAllSubcategoriesOnCategory(id:string):Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }
}
