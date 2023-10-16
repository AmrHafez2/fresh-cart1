import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignupComponent } from './signup/signup.component';
import { routewatcherGuard } from './routewatcher.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategorydetailsComponent } from './categorydetails/categorydetails.component';
import { AllsubcategoriesoncategoryComponent } from './allsubcategoriesoncategory/allsubcategoriesoncategory.component';
import { BrandsComponent } from './brands/brands.component';



const routes: Routes = [
  {path: "" , redirectTo: "home", pathMatch: "full"},
  {path: "home",  canActivate:[routewatcherGuard],  component:HomeComponent},
  {path: "productdetails/:id",   canActivate:[routewatcherGuard],   component:ProductdetailsComponent},
  {path: "categories",  canActivate:[routewatcherGuard],  component:CategoriesComponent},
  {path: "brands",  canActivate:[routewatcherGuard],  component:BrandsComponent},
  {path: "allsubcategoriesoncategory/:id",   canActivate:[routewatcherGuard],   component:AllsubcategoriesoncategoryComponent},
  {path: "cart",   canActivate:[routewatcherGuard],   component:CartComponent},
  {path: "checkout/:id",   canActivate:[routewatcherGuard],   component:CheckoutComponent},
  {path: "forgotpassword", loadComponent:() => import('./forgotpassword/forgotpassword.component').then((m) => m.ForgotpasswordComponent), title: "Forgot Password"},
  {path: "products", loadComponent:() => import('./products/products.component').then((m) => m.ProductsComponent), title: "Products"},
  {path: "wishlist", loadComponent:() => import('./wishlist/wishlist.component').then((m) => m.WishlistComponent), title: "wishlist"},
  {path: "signup" , component:SignupComponent},
  {path: "login" , component:LoginComponent},


  {path: "**" , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
