import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

//Services PrimeNg
import { MessageService } from "primeng/api";
import { AuthenticationService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})

export class LoginComponent implements OnInit {
  @Input() Loading: boolean = false;

  constructor(private _FormBuilder: FormBuilder, private _MesageService: MessageService, private _AuthenticationService: AuthenticationService, private _Route: Router) { }


  FormLogin: FormGroup;

  ngOnInit() {
    this.FormLogin = this._FormBuilder.group({
      UserName: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required)
    });
  }

  onSubmit() {

    if (this.FormLogin.valid) {

      this.Loading = true;

      this._AuthenticationService.Login(this.FormLogin.get('UserName').value, this.FormLogin.get('Password').value).subscribe(
        result => {

          this.Loading = false;

          if (result.statusCode != "00") {
            this._MesageService.add({ severity: 'info', summary: 'Information', detail: result.message });
          } else {
            this._Route.navigate(['/Home/Default']);
          }
        
        },
        error => {
          this._MesageService.add({ severity: 'error', summary: 'Error', detail: error.message });
          this.Loading = false;
        });
    }
  }

}
