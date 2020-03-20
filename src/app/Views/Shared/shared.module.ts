import { NgModule } from "@angular/core";

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
    declarations:[        
        HeaderComponent,
        NavbarComponent,
        BreadcrumbsComponent,
        FooterComponent
    ],
    exports:[
        HeaderComponent,
        NavbarComponent,
        BreadcrumbsComponent,
        FooterComponent
    ]
})

export class SharedModule{}