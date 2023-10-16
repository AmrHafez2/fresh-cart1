import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../notification.service';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any[] = [];
  pageSize:number = 0;
  p:number = 1;
  totalItems:number = 0;

  constructor(private _ProductsService:ProductsService, private _CartService:CartService, private _NotificationService:NotificationService) {}

  ngOnInit(): void {

    this._ProductsService.getProducts().subscribe({
      next:(response) => {
        console.log(response);
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage;
        this.totalItems = response.results;
      },

      error:(err) => console.log(err)
  })
  }

  addToCart(productId:string) {
    this._CartService.addToCart(productId).subscribe({
      next:(response) => {
        console.log(response);
        this._NotificationService.showSuccess(response.message);
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
      },
      error:(err) => {
        console.log(err);
        this._NotificationService.showError("Something went wrong, Please try again")
      }
    })
  }
  pageChanged(pageNum:any):void {

    this._ProductsService.getProducts(pageNum).subscribe({
      next:(response) => {
        console.log(response);
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage;
        this.totalItems = response.results;
      },

      error:(err) => console.log(err)
  })

  }

}
