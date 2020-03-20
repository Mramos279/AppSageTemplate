import {Routes, RouterModule} from '@angular/router'
import { CatalogComponent } from './catalog.component'
import { BankComponent } from './bank/bank.component'
import { ClientComponent } from './client/client.component'
import { CountryComponent } from './country/country.component'
import { CurrencyComponent } from './currency/currency.component'
import { AuthenticationGuard } from '../../Guards/authentication.guard';

const CatalogRoutes:Routes =[
    {
        path: 'Catalog', component: CatalogComponent, children: [
            {
                path: 'Bank', component: BankComponent, canActivate:[AuthenticationGuard]
            },
            {
                path: 'Client', component:ClientComponent, canActivate:[AuthenticationGuard]
            },
            {
                path: 'Country', component:CountryComponent, canActivate:[AuthenticationGuard]
            },
            {
                path: 'Currency', component:CurrencyComponent, canActivate:[AuthenticationGuard]
            },
            {
                path: '', redirectTo: '/404', pathMatch: 'full'
            }        
        ]
    }
]

export const CatalogRoutesModule = RouterModule.forChild(CatalogRoutes);