import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  @Input() Loading: boolean = false;
  FormReset: FormGroup

  constructor(private FormResetBuilder: FormBuilder, private _MesageService: MessageService, private _UserService: UserService, private _Route: Router) {

    this.FormReset = FormResetBuilder.group({
      UserName: new FormControl("", Validators.required)
    })

  }

  ngOnInit() {

  }


  onSubmit() {

    if (this.FormReset.valid) {

      this.Loading = true;
      this._UserService.ResetPassword(this.FormReset.get('UserName').value).subscribe(response => {

        this.Loading = false;

        if (response.statusCode != "00") {
          this._MesageService.add({ severity: 'info', summary: 'Information', detail: response.message });
        } else {      

          localStorage.setItem('UserName', this.FormReset.get('UserName').value);

          this._MesageService.clear();
          this._MesageService.add({ key: 'popupRedirect', sticky: true, severity: 'success', summary: 'Reset Password', detail: 'Please use the recovery code sent to your email' });

        }

      }, error => {

        this.Loading = false;
        this._MesageService.add({ severity: "Error", summary: 'error', detail: error.message })
      });

    }

  }

  onRedirect() {
    this._Route.navigate(['/Account/Confirm']);
  }

}
