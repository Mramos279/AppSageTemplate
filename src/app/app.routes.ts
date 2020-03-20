
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Views/Template/not-found/not-found.component';

const appRoutes: Routes = [    
    { 
        path: '404', component: NotFoundComponent 
    },
    {
        path:'', redirectTo: '/Home/Default', pathMatch:'full'
    },
    { 
        path: '**', redirectTo: '/404', pathMatch:'full' 
    }
];

export const appRoutesModule = RouterModule.forRoot(appRoutes/*, {useHash:true}*/);