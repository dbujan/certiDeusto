import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createUser(user:any){
    return this.http.post(`${this.API_URI}/users`, user);
  }
}
