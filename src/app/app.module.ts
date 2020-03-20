import { BrowserModule } from '@angular/platform-browser';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './Views/Template/not-found/not-found.component';

//Modules
import { AccountModule } from './Views/Account/account.module';
import { HomeModule } from './Views/Home/home.module';
import { CatalogModule } from './Views/Catalog/catalog.module';
import { ProccessModule } from './Views/Proccess/proccess.module';
import { ErrorComponent } from './Views/Template/error/error.component';
import { ProfileModule } from './Views/Profile/profile.module';

//Rutas
import { appRoutesModule } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    AccountModule,
    HomeModule,
    CatalogModule,
    ProccessModule,
    ProfileModule,
    appRoutesModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    ErrorComponent
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
