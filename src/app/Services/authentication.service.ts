import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Authentication } from '../Entities/Authentication.model';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private _CurrentTokenSubject: BehaviorSubject<Authentication>;

  constructor(private _HttpClient: HttpClient) {

    this._CurrentTokenSubject = new BehaviorSubject<Authentication>(JSON.parse(localStorage.getItem('Token')));

  }

  public CurrenToken(): Authentication {
    return this._CurrentTokenSubject.value;
  }

  Login(UserName: string, Password: string) {

    //console.log('Inicio Login');

    return this._HttpClient.post<any>(environment.ApiUrl + '/Login', { UserName: UserName, Password: Password, ApplicationId:null})
      .pipe(map(result => {

        //console.log("Inicio localStore");

        if (result.statusCode == "00") {

          var _Token = new Authentication();
          _Token.TokenString = result.token;

          localStorage.setItem('Token', JSON.stringify(_Token));
          this._CurrentTokenSubject.next(_Token);
          
        }

        //console.log(this.CurrenToken());

        //console.log("Fin localStore");
        return result;

      }));

  }

  LogOut() {
    localStorage.clear();
    this._CurrentTokenSubject.next(null);    
  }

}
