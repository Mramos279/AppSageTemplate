
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable() // Interceptor para agregar el token guardado en el localStore
export class TokenInterceptor implements HttpInterceptor {

    constructor(private _AuthenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //console.log('Inicio Token Interceptors');

        var _Token = this._AuthenticationService.CurrenToken();

        //si el token es distinto de null se agrega el token en la peticion Request
        if (_Token != null) {

            //Obtenemos el Header del Request y agregamos la autenticacion            
            request = request.clone({ setHeaders: { Authorization: 'Bearer ' + _Token.TokenString } });

        }

        //console.log('Fin Token Interceptors');
        return next.handle(request);        
    }
}