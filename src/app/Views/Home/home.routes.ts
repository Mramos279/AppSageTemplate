import { Routes, RouterModule, } from '@angular/router'
import { HomeComponent } from './home.component'
import { DefaultComponent } from './default/default.component'
import { AuthenticationGuard } from 'src/app/Guards/authentication.guard';

const HomeRoutes: Routes=
[
    {
        path: 'Home', component: HomeComponent, children: 
        [
            {
                path: 'Default', component:DefaultComponent, canActivate:[AuthenticationGuard]
            },
            {
                path: '', redirectTo: '/Home/Default', pathMatch: 'full'
            }
        ]
    }
]

export const HomeRoutesModule = RouterModule.forChild(HomeRoutes);
