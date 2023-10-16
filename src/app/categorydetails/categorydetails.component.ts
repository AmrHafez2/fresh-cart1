import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-categorydetails',
  standalone: false,
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent implements OnInit{
  constructor(private _ProductsService:ProductsService, private _ActivatedRoute:ActivatedRoute) {}

  categoryId:any = '';
  categoryDetails:object = {};

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

      }
    })

  }

}
