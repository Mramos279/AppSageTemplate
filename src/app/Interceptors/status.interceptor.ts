import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StatusInterceptor implements HttpInterceptor {

    constructor(private _AuthenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //console.log('Inicio Status Interceptor');

        return next.handle(request).pipe(catchError(error => {
            if (error.status === 401) {

                // se borra el token guardado y se reinicia la pagina para luego redireccionar con el Guard
                this._AuthenticationService.LogOut();

                //console.log('Fin Status Interceptor');
                location.reload(true);
            }

            //console.log('Fin Status Interceptor');
            return throwError(error);
        }))
        
    }
}