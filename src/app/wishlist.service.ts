import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  numberOfFavItems:BehaviorSubject<number> = new BehaviorSubject(0)


  constructor(private _HttpClient:HttpClient) {
    this.getWishlist().subscribe({
      next:(response) => {
        this.numberOfFavItems.next(response.data.length);
      }

    })
  }

  addToWishlist(productId:string):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist', {productId:productId})
  }
  getWishlist():Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }
  removeItemFromWishlist(productId:string):Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`)
  }

}
