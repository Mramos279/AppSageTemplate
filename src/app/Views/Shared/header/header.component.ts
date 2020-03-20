import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Entities/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private _User:User

  ImageString:string
  UserString:string

  constructor(private _AuthenticationService: AuthenticationService, private _UserService: UserService) {

  }

  ngOnInit() {

    if (this._UserService.GetCurrentUser() == null) {

      this._UserService.GetUser().subscribe(response => {

        this._User = response;

        this.ImageString = (this._User.ImageUrl==null)?"/assets/images/login.png":this._User.ImageUrl;
        this.UserString = this._User.FirstName + ' ' + this._User.LastName;

      });

    } else {
      this._User = this._UserService.GetCurrentUser();

      this.ImageString = (this._User.ImageUrl==null)?"/assets/images/login.png":this._User.ImageUrl;
      this.UserString = this._User.FirstName + ' ' + this._User.LastName;
    }

  }


  LogOut() {
    this._AuthenticationService.LogOut();
    location.reload();
  }

}
