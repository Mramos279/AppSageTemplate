import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { Router } from '@angular/router';
import { Menu } from 'src/app/Entities/Menu.model';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  _Title: SafeHtml
  _Link: SafeHtml

  constructor(private _MenuService: MenuService, private _Router: Router, private _Html: DomSanitizer) {
  }

  ngOnInit() {

    try {
      this.PrintBreadCrumbs();
    } catch (error) {
     console.log(error.message); 
    }
  }

  PrintBreadCrumbs() {

   var CurrenUrl= '#'+this._Router.url;

    //si el menu guardado en el localstorage es null se hace la peticion al api Sop una sola vez
    if (this._MenuService.GetCurrentMenuArray() == null) {

      this._MenuService.GetMenuArray().subscribe(result => {

        //Carga del Titulo
        this._Title = this._Html.bypassSecurityTrustHtml(this.AddTitle(result.filter(x => x.Url == CurrenUrl)[0]));

      });

    } else {
      //Carga del titulo
      this._Title = this._Html.bypassSecurityTrustHtml(this.AddTitle(this._MenuService.GetCurrentMenuArray().filter(x => x.Url == CurrenUrl)[0]));
    }

  }


  private AddTitle(menu: Menu): string {
    return '<h1><i class="' + menu.Icon + '"></i>&nbsp;' + menu.MenuName + '</h1>';
  }

  private AddLink(menu: Menu, active: boolean = false): string {
    return (active) ? '<li class="active">' + menu.MenuName + '</li>' : '<li><a href="' + menu.Url + '">&nbsp;' + menu.MenuName + '</a></li>';
  }

}
