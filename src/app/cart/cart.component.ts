import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { NotificationService } from '../notification.service';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDetails:any = null;
  numOfCartItems:number = 0;

  constructor(private _CartService:CartService, private _NotificationService:NotificationService) {}

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next:(response) => {
        console.log(response.data);
        this.numOfCartItems = response.data.products.length;
        this.cartDetails = response.data;
      },
      error:(err) => {
        this._NotificationService.showError("Something went wrong, please try again later")

      }
    })
  }

  updateItemQuantity(productId:string, count:number) {
    this._CartService.updateItemQuantity(productId, count).subscribe({
      next:(response) => {
        this.cartDetails = response.data
      },
      error:(err) => {
        console.log(err);

      }
    })
  }

  removeItem(productId:string) {
    this._CartService.removeCartItem(productId).subscribe({
      next:(response) => {
        console.log(response);
        this.cartDetails = response.data;
        this._NotificationService.showSuccess("Item has been removed successfully");
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
      },
      error:(err) => {
        this._NotificationService.showError("Something went wrong")
        console.log(err)
      }
    })
  }

  clear():void {
    this._CartService.clearCart().subscribe({
      next:(response) => {
        console.log("msg from clear cart", response);
        if(response.message === "success") {
          this.cartDetails = null;
          this.numOfCartItems = 0;
          this._NotificationService.showWarning('your cart has been cleared');
        }
      },
      error:(err) => {
        console.log("msg from clear cart", err);
      }
    })
  }

}
