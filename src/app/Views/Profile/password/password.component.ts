import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

Loading:boolean = false;

  FormChangePassword: FormGroup;
  //Loadin = true;

  constructor(private _FormBuilder: FormBuilder, private _MessageService: MessageService, private _UserService: UserService) { }


  ngOnInit() {

    var validPassword = "(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}";

    this.FormChangePassword = this._FormBuilder.group({

      OldPassword: new FormControl('', Validators.required),
      NewPassword: new FormControl('', [Validators.required, Validators.pattern(validPassword)]),
      ConfirmPassword: new FormControl('', Validators.required)
    });
  }

  onSubmit() {

    //Validando que el formulario sea válido
    if (this.FormChangePassword.valid) {

      //se valida que la contraseña actual sea distinta de la contraseña nueva
      if (this.FormChangePassword.get('OldPassword').value != this.FormChangePassword.get('NewPassword').value) {

        //se valida que la nueva contraseña sea igual a la de confirmacion
        if (this.FormChangePassword.get('NewPassword').value == this.FormChangePassword.get('ConfirmPassword').value) {

          //se realiza la peticion de la confirmacion del cambio de contraseña
          this.Loading = true;
          this._UserService.ChangePassword(this.FormChangePassword.value).subscribe(response => {

            this.Loading = false;

            //si la respuesta es igual a 00 es Success de lo contrario se manda la descripcion del error
            if (response.statusCode != "00") {

              this._MessageService.add({ severity: 'info', summary: 'Information', detail: response.message });

            } else {
              this._MessageService.add({ severity: 'success', summary: 'Confirm Password', detail: 'Your password has changed.' });
              this.FormChangePassword.reset();
            }

          }, error => {
            this.Loading = false;
            this._MessageService.add({ severity: 'error', summary: 'Error', detail: error.message });
          });

        } else {
          this._MessageService.add({ severity: 'info', summary: 'Change Password', detail: 'Passwords do not match' });
        }
      } else {
        this._MessageService.add({ severity: 'info', summary: 'Change Password', detail: 'The new password must be different from the current password' });
      }

    }
  }

}
