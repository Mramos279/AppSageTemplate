import { NgModule, Input } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//HttpInterceptor
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Components
import { AccountComponent } from './account.component';

import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { ConfirmComponent } from './confirm/confirm.component';

//Routes
import { AccountRoutesModule } from './account.routes';

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
import { LoadingComponent } from '../../Components/loading/loading.component';

@NgModule({
    imports: [
        AccountRoutesModule,
        InputTextModule,
        ButtonModule,
        MessageModule,
        MessagesModule,
        ToastModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        ResetComponent,
        ConfirmComponent,
        LoadingComponent
    ],
    exports: [
        LoginComponent,
        ResetComponent,
        ConfirmComponent           
    ],
    providers: [
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: StatusInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
})

export class AccountModule {
}