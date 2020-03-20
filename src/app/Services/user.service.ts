import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Entities/User.model';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  private _UserBehaviorSubject: BehaviorSubject<User>;

  constructor(private _HttpRequest: HttpClient) {
    this._UserBehaviorSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')));
  }

  //Método que obtiene el usuario desde el localStore con el metodo BehaviorSubject
  GetUser() {

    //se realiza la peticion hacia el api para obtener la informacion del usuario
    return this._HttpRequest.post<any>(environment.ApiUrl + '/GetUser', {}, this._httpOptions)
      .pipe(map(result => {

        //Obtenemos la iformacion del usuario que viene en el objeto result
        var _ItemUser = result.result;

        //creamos un nuevo objeto de tipo usuario y seteamos su valor
        var _User = new User();
        _User.UserId = _ItemUser.userId;
        _User.FirstName = _ItemUser.firstName;
        _User.LastName = _ItemUser.lastName;
        _User.UserName = _ItemUser.userName;
        _User.Password = _ItemUser.password;
        _User.ImageUrl = _ItemUser.imageUrl;
        _User.Email = _ItemUser.email;
        _User.Phone = _ItemUser.phone;
        _User.ProfileId = _ItemUser.profileId;
        _User.RolId = _ItemUser.rolId;

        //Guardamos la información del usuario en el localStore
        this.SetCurrentUser(_User);   

        //Retornamos la informacion del usuario
        return this.GetCurrentUser();

      })); //Fin de la peticion hacia el api que obtiene la informacion del usuario)
  }

  SetCurrentUser(_User:User){
    localStorage.setItem('User', JSON.stringify(_User));
        this._UserBehaviorSubject.next(_User);
  }

  GetCurrentUser(): User {
    return this._UserBehaviorSubject.value;
  }

  ResetPassword(UserName: string) {
    return this._HttpRequest.post<any>(environment.ApiUrl + '/RequestChange', { UserName: UserName, Url: environment.UrlConfirm }, this._httpOptions);
  }

  ConfirmChange(RecoveryCode: string, NewPassword) {
    return this._HttpRequest.post<any>(environment.ApiUrl + '/ConfirmChange', { UserName: localStorage.getItem('UserName'), RecoveryCode: RecoveryCode, NewPassword: NewPassword, Url: environment.UrlLogin });
  }

  ChangePassword(form:any){
    return this._HttpRequest.post<any>(environment.ApiUrl + '/ChangePassword', form, this._httpOptions);
  }

  UpdateProfile(form:any){
    return this._HttpRequest.post<any>(environment.ApiUrl + '/UpdateProfile', form, this._httpOptions);
  }

}
