import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() Loading: boolean = false;
  FormConfirm: FormGroup

  constructor(private FormConfirmBuilder: FormBuilder, private _MesageService: MessageService, private _UserService: UserService, private _Route: Router) {

    var validPassword = "(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}";

    this.FormConfirm = FormConfirmBuilder.group({
      RecoveryCode: new FormControl("", Validators.required),
      NewPassword: new FormControl("", [Validators.required, Validators.pattern(validPassword)]),
      ConfirmPassword: new FormControl("", Validators.required)
    });

  }

  ngOnInit() {

  }

  onSubmit() {

    //Validando que el formulario sea válido
    if (this.FormConfirm.valid) {

      //se valida que la nueva contraseña sea igual a la de confirmacion
      if (this.FormConfirm.get('NewPassword').value == this.FormConfirm.get('ConfirmPassword').value) {

        //se realiza la peticion de la confirmacion del cambio de contraseña
        this.Loading = true;
        this._UserService.ConfirmChange(this.FormConfirm.get('RecoveryCode').value,this.FormConfirm.get('NewPassword').value).subscribe(response => {

          this.Loading = false;

          //si la respuesta es igual a 00 es Success de lo contrario se manda la descripcion del error
          if (response.statusCode != "00") {
            
            this._MesageService.add({ severity: 'info', summary: 'Information', detail: response.message });            

          } else {
            this._MesageService.add({ key: 'popupConfirm', severity: 'success', summary: 'Confirm Password', detail: 'Your password has changed.' });
          }

        }, error => {
          this.Loading = false;
          this._MesageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        });

      } else {
        this._MesageService.add({ severity: 'info', summary: 'Confirm Password', detail: 'Passwords do not match' });
      }

    }

  }

  onRedirect() {
    this._Route.navigate(['/Account/Login']);
  }

}
