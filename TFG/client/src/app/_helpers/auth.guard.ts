import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';

/** 
 * Clase para la comprobación de login al acceder a las páginas 
 * @author Informática Integral Vasca
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
       
    ) { }
    private user: any

    /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isLoggedIn = this.authService.isLoggedIn;
        if (isLoggedIn) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }*/

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

        const user : any = this.authService.currentUser;

        if(user.id_role === 1){
            return true;
        }else{
            return false;
        }

        
        /*const user: any = this.authService.setcurrentUser().subscribe( res => {
            this.user = res;
            console.log(this.user);
          });
        console.log(user);
        console.log(user.id_role);
        return (user.id_role === 1 && this.router.parseUrl('/students')) ||
                (user.id_role === 2 && this.router.parseUrl('/teachers')) ||
                (user.id_role === 3 && this.router.parseUrl('/secretaries')) ||
                (this.router.parseUrl('/login'));*/

    }
}