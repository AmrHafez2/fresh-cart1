import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotpasswordService } from '../forgotpassword.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  stage1:boolean = true;
  stage2:boolean = false;
  stage3:boolean = false;
  email:string = '';
  userSuccessMsg:string = '';
  userErrorMsg:string = '';

  constructor(private _ForgotpasswordService:ForgotpasswordService, private _Router:Router) {}


  emailForm:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email])
  })

  verifyResetCodeFrom:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })
  resetPassForm:FormGroup = new FormGroup({
    newPassword:new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^\w{6,}$/)])
  })

  sendEmail():void{
    let userEmail = this.emailForm.value;
    this.email = userEmail.email
    this._ForgotpasswordService.sendEmail(userEmail).subscribe({
      next:(response) => {
        console.log(response);
        this.userSuccessMsg = response.message;
        this.stage1 = false;
        this.stage2 = true;
      },
      error:(err) => {
        console.log(err);
        this.userErrorMsg = err.error.message;
      }


    })
  }
  verifyCode():void{
    let resetCode = this.verifyResetCodeFrom.value;
    this._ForgotpasswordService.verifyCode(resetCode).subscribe({
      next:(response) => {
        console.log(response);
        this.stage2 = false;
        this.stage3 = true;
        this.userSuccessMsg = response.message;
      },
      error:(err) => {
        console.log(err);
        this.userErrorMsg = err.error.message;
      }
    })
  }
  resetNewPassword():void{
    let formData = this.resetPassForm.value;
    formData.email = this.email;
    this._ForgotpasswordService.resetNewPassword(formData).subscribe({
      next:(response) => {
        console.log(response);
        this.userSuccessMsg = response.message;
        if(response.token) {
          localStorage.setItem("userToken", response.token);
          this._Router.navigate(['/home']);
        }
      },
      error:(err) => {
        console.log(err);
        this.userErrorMsg = err.error.message;
      }
    })
  }
}


