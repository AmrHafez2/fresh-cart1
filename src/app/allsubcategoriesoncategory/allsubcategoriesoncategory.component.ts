import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-allsubcategoriesoncategory',
  standalone: false,
  templateUrl: './allsubcategoriesoncategory.component.html',
  styleUrls: ['./allsubcategoriesoncategory.component.css']
})
export class AllsubcategoriesoncategoryComponent implements OnInit{
  constructor(private _ProductsService:ProductsService, private _ActivatedRoute:ActivatedRoute) {}

  categoryId:any = '';
  categoryDetails:any = {};
  allSubcategories:any = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params) => {
        this.categoryId = params.get('id');
        this._ProductsService.getCategoryDetails(this.categoryId).subscribe({
          next:(response) => {
            this.categoryDetails = response.data;
          },
          error:(err) => console.log("error from category details", err)
        })

        this._ProductsService.getAllSubcategoriesOnCategory(this.categoryId).subscribe({
          next:(response) => {
            console.log(response);
            this.allSubcategories = response.data;
          },
          error:(err) => console.log("error from subcategories", err)

        })

      }
    })

  }

 /*  pageChanged(pageNum:any):void {

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

  } */

}
