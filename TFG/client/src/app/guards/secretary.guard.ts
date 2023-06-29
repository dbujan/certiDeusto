import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecretaryGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
   
) { }
private user: any

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

    const user : any = this.authService.currentUserValue;
    const token : boolean = this.authService.verifiedToken;
    const isVerified = this.authService.isVerified();

    if(user.id_role === 3 && isVerified){
        return true;
    }else{
        return false;
    }

}
  
}

