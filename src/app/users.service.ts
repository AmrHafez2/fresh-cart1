import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  friends:string[] = ["ahmed", "hossam", "houda", "tito", "koko"]


  constructor() { }
}
