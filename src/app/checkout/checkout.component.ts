import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _CartService:CartService, private _ActivatedRoute:ActivatedRoute) {}

  id:any = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params) => {
        this.id =  params.get('id');
      }
    })
  }

  navigateToPayPage(url:string) {
    window.location.href = url;

  }

  shippingData:FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null)
  })

   handleSubmit(shippingData:FormGroup) {
    this._CartService.payOnline(shippingData.value, this.id).subscribe({
      next:(Response:any) => {
        this.navigateToPayPage(Response.session.url);
      },
      error:(err) => {
        console.log(err);

      }
    })

  }

}
