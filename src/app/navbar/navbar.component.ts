import { CartService } from './../cart.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { WishlistService } from '../wishlist.service';





AuthService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  user:string = '';
  cartNum:number = 0;
  numOfFavItems:number = 0;


  @ViewChild('navBar') navElement!:ElementRef;

  @HostListener('window:scroll')
  onScroll():void {
    if(scrollY > 300) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'navBar-scroll-effect')
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'navBar-scroll-effect')
    }
  }

  constructor(private _AuthService:AuthService, private _CartService:CartService, private _Renderer2:Renderer2, private _WishlistService:WishlistService) {}


  ngOnInit(): void {

    this._CartService.numberOfCartItems.subscribe({
      next:(response) => this.cartNum = response,
    })
    this._WishlistService.numberOfFavItems.subscribe({
      next:(response) => this.numOfFavItems = response,
    })

    this._CartService.getLoggedUserCart().subscribe({
      next:(response) => {
        this.cartNum = response.numOfCartItems;
      }

    })

    this._AuthService.userData.subscribe({
      next:() => {
        if(this._AuthService.userData.getValue() !== null) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      }
    })
  }






  logOut() {
    this._AuthService.logOut()
  }

}
