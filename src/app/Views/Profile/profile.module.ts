import { NgModule, Input } from "@angular/core";

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//HttpInterceptor
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Componentes
import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';
import { PasswordComponent } from './password/password.component';

//Rutas
import { ProfileRoutesModule } from './profile.routes';

//Modules
import { SharedModule } from '../Shared/shared.module';

//Module PrimeNg
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

//Services PrimeNg
import { MessageService } from "primeng/api";
import { StatusInterceptor } from '../../Interceptors/status.interceptor';
import { TokenInterceptor } from '../../Interceptors/token.interceptor';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
    imports: [
        SharedModule,
        ProfileRoutesModule,
        InputTextModule,
        ButtonModule,
        MessageModule,
        MessagesModule,
        ToastModule,
        FileUploadModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule        
    ],
    declarations: [
        ProfileComponent,
        UserComponent,
        PasswordComponent
    ],
    exports: [
        UserComponent,
        PasswordComponent
    ],
    providers:[
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: StatusInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
})

export class ProfileModule {
 @Input() Loading:boolean = false;
}