import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddheadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(localStorage.getItem("userToken") !== null) {

      const myToken:any = localStorage.getItem("userToken");
      request = request.clone({
      setHeaders:{
        token:myToken
      }
    })

    }



    return next.handle(request);
  }
}
