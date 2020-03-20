import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { PasswordComponent } from './password/password.component';
import { UserComponent } from './user/user.component';

import { AuthenticationGuard } from 'src/app/Guards/authentication.guard';

const profileRoutes: Routes = [{

    path: 'Profile', component: ProfileComponent, children: [            
        {
            path: 'User', component: UserComponent, canActivate:[AuthenticationGuard]
        },
        {
            path: 'Password', component: PasswordComponent, canActivate:[AuthenticationGuard]
        },
        {
            path: '', redirectTo: '/Profile/User', pathMatch: 'full'
        }
    ]

}]

export const ProfileRoutesModule = RouterModule.forChild(profileRoutes);
