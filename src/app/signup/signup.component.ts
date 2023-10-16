import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
   constructor(private _AuthService:AuthService, private _Router:Router) {}


  errorMsg:string = "";
  isLoading:boolean = false;
  registerForm:FormGroup = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl('',),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators:[this.repasswordMatch]} as FormControlOptions )

  repasswordMatch(form:FormGroup):void {
    let password = form.get('password');
    let rePassword = form.get('rePassword');

    if(rePassword?.value === "") {
      rePassword?.setErrors({required: 'true'});
    } else if(password?.value !== rePassword?.value) {
      rePassword?.setErrors({repasswordMatch: 'rePassword not matched'});
    }

  }



   handleRegister():void {

  this.isLoading = true;

    if(this.registerForm.valid) {
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
           if(response.message === "success") {
            this.isLoading = false
            console.log("success")
            this._Router.navigate(["/login"])
           } else {
            console.log("wrong");

           }

        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error.message;
        }

      })


    }

  }

}
