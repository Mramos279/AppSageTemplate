import { Routes, RouterModule } from "@angular/router";
import { ProccessComponent } from './proccess.component';
import { DecodingComponent } from './decoding/decoding.component';
import { AuthenticationGuard } from '../../Guards/authentication.guard';


const ProccessRoutes: Routes=
[
    {
        path: 'Process', component: ProccessComponent, children:
        [
            {
                path: 'Decode', component: DecodingComponent, canActivate:[AuthenticationGuard]
            },
            {
                path:'', redirectTo: '/404', pathMatch:'full'
            }          
        ]
    }
]

export const ProccessRoutesModule = RouterModule.forChild(ProccessRoutes);

