import { NgModule } from "@angular/core";

import { SharedModule } from '../Shared/shared.module';

import { CatalogComponent } from './catalog.component';

import { BankComponent } from './bank/bank.component';
import { ClientComponent } from './client/client.component';
import { CountryComponent } from './country/country.component';
import { CurrencyComponent } from './currency/currency.component';

//Routes
import { CatalogRoutesModule } from './catalog.routes';

@NgModule({
    imports:[
        SharedModule,
        CatalogRoutesModule
    ],
    declarations:[
        CatalogComponent,
        BankComponent,
        ClientComponent,
        CountryComponent,
        CurrencyComponent
    ],    
    exports:[
        BankComponent,
        ClientComponent,
        CountryComponent,
        CurrencyComponent
    ]
})

export class CatalogModule{
    
}