import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private _Router: Router, private _AuthenticationService: AuthenticationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //console.log("Inicio Autentication Guard");
    //debugger;

    const CurrentUser = this._AuthenticationService.CurrenToken();

    if (CurrentUser != null) {

      //console.log("Fin Autentication Guard");
      return true;
    }

    //console.log("Fin Autentication Guard");
    this._Router.navigate(['/Account/Login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
