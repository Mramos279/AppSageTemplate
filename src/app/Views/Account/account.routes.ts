import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';

import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { ConfirmComponent } from './confirm/confirm.component';



const accountRoutes: Routes=[
    {
        path: 'Account', component: AccountComponent, children:[
            {
                path:'Login', component: LoginComponent
            },
            {
                path: 'Reset', component: ResetComponent
            },
            {
                path: 'Confirm', component:ConfirmComponent
            },
            {
                path: '', redirectTo: '/Account/Login', pathMatch: 'full'
            }
        ]
    }
];

export const AccountRoutesModule = RouterModule.forChild(accountRoutes);