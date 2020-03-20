import { NgModule } from "@angular/core";

import { SharedModule } from '../Shared/shared.module';

import { HomeComponent } from './home.component';

import { DefaultComponent } from './default/default.component';

//Routes
import { HomeRoutesModule } from './home.routes';

//AgGrid
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports:[
        SharedModule,
        HomeRoutesModule,
        BrowserModule,
        HttpClientModule,
        AgGridModule.withComponents([])
    ],
    declarations:[
        HomeComponent,
        DefaultComponent
    ],
    exports:[
        DefaultComponent
    ]
})

export class HomeModule{
    
}