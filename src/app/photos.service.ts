import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  constructor(private _HttpClient:HttpClient) {
   }


  getPhotos():Observable<any> {
   return this._HttpClient.get('https://jsonplaceholder.typicode.com/photos')

  }

}
