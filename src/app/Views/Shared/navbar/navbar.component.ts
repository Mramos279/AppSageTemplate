import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { MenuService } from '../../../Services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  _Data: SafeHtml;

  constructor(private _Html: DomSanitizer, private _MenuService: MenuService) {

  }

  ngOnInit() {

    try {
      this.PrintMenu();
    } catch (error) {
     
      console.log(error.message);
      
    }
  }

  PrintMenu() {

    //Obtenemos el menu guardado en memoria
    //si es null se realiza la peticion solo la primera vez
    if (this._MenuService.GetCurrentMenu() == null) {

      //Realizamos la peticion
      this._MenuService.GetMenu().subscribe(response => {

        //Obtenemos el menuString y se guarda en el localStorage
        this._Data = this._Html.bypassSecurityTrustHtml(response);
      });

    } else {
      //Obtenemos el menu guardado en el localStorage
      this._Data = this._Html.bypassSecurityTrustHtml(this._MenuService.GetCurrentMenu());
    }
  }

}
