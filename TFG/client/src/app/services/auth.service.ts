import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, BehaviorSubject, observable} from "rxjs";
import { tap } from 'rxjs/operators';






@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Variables para saber si el usuario está logueado
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  tokeni : any = localStorage.getItem('token');

  //current user
  public currentUser: any;
  public verifiedToken: any;
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser1: Observable<any>;

  

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser1 = this.currentUserSubject.asObservable();

    if(localStorage.getItem('token')){
      this._isLoggedIn.next(true);
    }
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}

  getcurrentUser(token:any): Observable<any>{ 
   return this.http.get(`${this.API_URI}/userstoken/${token}`);
  }

  setCurrentUser(user:any){
    this.currentUser = user;
    console.log(this.currentUser.id + "setcurrentuser");
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  /*public get currentUser(): any {
    return localStorage.getItem('currentUser');

  }*/

  /*login(user:any): Observable<boolean> {

  }*/

  loginAlumno(email:any): Observable<any> {
    return this.http.get(`${this.API_URI}/loginAlumno/${email}`);
  }

  loginProfesor(email:String): Observable<any> {
    return this.http.get(`${this.API_URI}/loginProfesor/${email}`);
  }

  loginSecretaria(email:String): Observable<any> {
    return this.http.get(`${this.API_URI}/loginSecretaria/${email}`);
  }
  //A este metodo se llama una vez que el login se ha comprobado.
  generateToken(usuario:any): Observable<any> {
    
    return this.http.post(`${this.API_URI}/generateToken`, usuario).pipe(
      tap((response: any) => {
        this._isLoggedIn.next(true);
        localStorage.setItem('token', response);
        /*const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${response}`
          })
        };*/
        
      }));
    

  }

  verifyToken(token:any): Observable<any> {
    var header = {
      headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${token}`)
    }
    return this.http.post(`${this.API_URI}/verifyToken`, token, header);
  }

  isVerified(): boolean{
    this.verifyToken(localStorage.getItem('token'));
    if(Response){
      return true;
    }else{
      return false;
    }
    
  }
  

}