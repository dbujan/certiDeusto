import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
   
) { }
private user: any

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

    const user = this.authService.currentUserValue;
    const isVerified = this.authService.isVerified();
    const token  = localStorage.getItem('token');
    //let verifiedToken: boolean = false;

    

    console.log(user.id_role + "user value from auth guard");
    /*this.authService.verifyToken(token).subscribe(data=>{
      console.log(data.email + "data email");
      if(data!==undefined){
        verifiedToken = true;
      }else{
        verifiedToken = false;
      }
    });*/

    if(user.id_role === 1 && isVerified){
      return true;
    }else{
      return false;
    }



    /*if(user.id_role === 1 && verifiedToken){
      return true;
    }else{
      return false;
    }*/

}
  
}
