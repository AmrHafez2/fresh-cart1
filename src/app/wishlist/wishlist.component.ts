import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';
import { NotificationService } from '../notification.service';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  favProducts:any[] = [];
  wishlistProducts:string[] = [];
  constructor(private _WishlistService:WishlistService, private _CartService:CartService, private _NotificationService:NotificationService) {

  }

  ngOnInit(): void {

    this._WishlistService.getWishlist().subscribe({
      next:(response) => {
        this.favProducts = response.data;
        let newData = response.data.map((e:any) => e._id);
        this.wishlistProducts = newData;
      },
      error:(err) => console.log("error from wishlist", err)

    })

  }

  addToCart(productId:string, element:HTMLButtonElement) {

    this._CartService.addToCart(productId).subscribe({
      next:(response) => {
        console.log(response);
        this._NotificationService.showSuccess(response.message);
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
      },
      error:(err) => {
        console.log(err);
        this._NotificationService.showError("Something went wrong, Please try again");
      }
    })
  }

  removeFavProduct(productId:string):void {
    this._WishlistService.removeItemFromWishlist(productId).subscribe({
      next:(response) => {
        this.wishlistProducts = response.data;
        this._NotificationService.showWarning(response.message);

        let newFavPro = this.favProducts.filter((e) => this.wishlistProducts.includes(e.id));
        this.favProducts = newFavPro;
        this._WishlistService.numberOfFavItems.next(this.favProducts.length);

      },
      error:(err) => {
        console.log("error from remove favorite product", err);
      }
    })
  }

}
