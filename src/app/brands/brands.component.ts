import { BrandsService } from './../brands.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands:any[] = [];
  pageSize:number = 0;
  p:number = 1;
  totalItems:number = 0;
  products:any[] = [];



  constructor(private _BrandsService:BrandsService) { }


  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(response) => {
        console.log(response);
        this.brands = response.data;
      }
  })


  }





}
