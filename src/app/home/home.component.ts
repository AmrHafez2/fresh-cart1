import { WishlistService } from './../wishlist.service';
import { Component, OnInit, Renderer2} from "@angular/core";
import { ProductsService } from "../products.service";
import { CartService } from "../cart.service";
import { NotificationService } from "../notification.service";








@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})

export class HomeComponent implements OnInit{

    products:any[] = [];
    searchTerm:string = '';
    wishlistProducts:string[] = [];



    constructor(private _ProductsService:ProductsService, private _CartService:CartService, private _NotificationService:NotificationService, private _WishlistService:WishlistService, private _Renderer2:Renderer2) {}


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

    addToWishlist(productId:string):void {
      this._WishlistService.addToWishlist(productId).subscribe({
        next:(response) => {
          console.log(response);
          this.wishlistProducts = response.data;
          this._NotificationService.showSuccess(response.message);
          this._WishlistService.numberOfFavItems.next(response.data.length);
        },
        error:(err) => {
          console.log("error from wishlist", err);
        }
      })
    }

    removeFavProduct(productId:string):void {
      this._WishlistService.removeItemFromWishlist(productId).subscribe({
        next:(response) => {
          console.log(response);
          this.wishlistProducts = response.data;
          this._NotificationService.showWarning(response.message);
        },
        error:(err) => {
          console.log("error from remove favorite product", err);
        }
      })


    }




    ngOnInit(): void {
        this._ProductsService.getProducts().subscribe({
            next:(response) => this.products = response.data
        })

        this._WishlistService.getWishlist().subscribe({
          next:(response) => {
            let newData = response.data.map((e:any) => e._id);
            this.wishlistProducts = newData;

          }
        })


    }


}
