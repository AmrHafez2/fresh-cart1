import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService, private _Router:Router) {}
  errorMsg:string = "";
  isLoading:boolean = false;
  loginForm:FormGroup = new FormGroup ({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(/^\w{6,}$/)]),
  })
   handleLogin(loginForm:FormGroup) {

  this.isLoading = true;
    if(loginForm.valid) {
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
           if(response.message === "success") {
            localStorage.setItem("userToken", response.token);
            this._AuthService.decodeUserData()
            this.isLoading = false
            console.log("success")
            this._Router.navigate(["/home"])
           } else {
            console.log("wrong");

           }

        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error.errors.msg;
          alert(this.errorMsg)
        }

      })


    }



   /*  this.isLoading = true;
     */

  }

}
