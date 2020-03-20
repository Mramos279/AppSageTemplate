import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//component
import { SharedModule } from '../Shared/shared.module';
import { ProccessComponent } from './proccess.component';
import { DecodingComponent } from './decoding/decoding.component';

//Routes
import { ProccessRoutesModule } from './proccess.routes';

//Modulos primeng
import { ToastModule } from "primeng/toast";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RadioButtonModule } from "primeng/radiobutton";
import { SelectButtonModule } from "primeng/selectbutton";

//Modulo AgGrid
import { AgGridModule } from "ag-grid-angular";
import "ag-grid-enterprise";

@NgModule({
    imports:[
        SharedModule,
        ProccessRoutesModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastModule,
        InputTextareaModule,
        RadioButtonModule,
        SelectButtonModule,
        AgGridModule.withComponents([])
    ],
    declarations:[
        ProccessComponent,
        DecodingComponent
    ],
    exports:[
        DecodingComponent
    ]
})

export class ProccessModule{
    
}