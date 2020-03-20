import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Entities/User.model';
import { LoadingComponent } from '../../../Components/loading/loading.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

Loading:boolean = false;

  private _User: User;

  public FormUser: FormGroup;

  public ImageString: string;

  demo: any[] = [];

  constructor(private _FormBuilder: FormBuilder, private _UserService: UserService, private _MessageService: MessageService) { }

  setForm(){

    //Seteando el Usuario actual
    this._User = this._UserService.GetCurrentUser();

    //Creando el Formcontrol con los valores del usuario actual por defecto
    this.FormUser = this._FormBuilder.group({

      FirstName: new FormControl(this._User.FirstName, Validators.required),
      LastName: new FormControl(this._User.LastName, Validators.required),
      Email: new FormControl(this._User.Email, Validators.required),
      Phone: new FormControl(this._User.Phone, Validators.required),
      ImageUrl: new FormControl(this._User.ImageUrl)
    });

    //Seteando la imagen del usuario
    this.ImageString = (this._User.ImageUrl == null) ? "/assets/images/login.png" : this._User.ImageUrl;

  }

  ngOnInit() {

    this.setForm();

  }

  onSubmit() {

    if (this.FormUser.valid) {

      this.Loading = true;
      this._UserService.UpdateProfile(this.FormUser.value).subscribe(response => {

        //si la respuesta es igual a 00 es Success de lo contrario se manda la descripcion del error
        if (response.statusCode != "00") {

          this._MessageService.add({ severity: 'info', summary: 'Information', detail: response.message });
          this.Loading = false;

        } else {
          this._MessageService.add({ severity: 'success', summary: 'Message', detail: 'Your profile has changed.' });

          //Actualizamos el localStore del usuario
          this._User.FirstName = this.FormUser.get('FirstName').value;
          this._User.LastName = this.FormUser.get('LastName').value;
          this._User.Email = this.FormUser.get('Email').value;
          this._User.Phone = this.FormUser.get('Phone').value;
          this._User.ImageUrl = this._User.ImageUrl;

          //Actualizando el nombre de usuario
          document.getElementById("UserName").innerHTML =  '<i class="fa fa-user"></i> ' + this._User.FirstName + ' ' + this._User.LastName;

          //Actualizando el localStorage
          this._UserService.SetCurrentUser(this._User);

          this.setForm();

        }

      }, error => {
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        this.Loading = false;
      });

    }

  }

  onUpload(event) {

    //Response de la carga de la imagen
    var Response = event.originalEvent.body;

    if (Response.statusCode == "00") {
      document.getElementById("ImgProfile").setAttribute("src", Response.result);
      document.getElementById("ImgLogin").setAttribute("src", Response.result);

      //Actualizamos la imagen del usuario
      this._User.ImageUrl = Response.result;
    }
  }
}
