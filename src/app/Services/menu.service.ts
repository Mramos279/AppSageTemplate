import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../Entities/Menu.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _MenuBehaviorSubject: BehaviorSubject<string>;
  private _MenuArrayBehaviorSubject: BehaviorSubject<Array<Menu>>;

  private _httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  }

  constructor(private _httpClient: HttpClient) {
    this._MenuBehaviorSubject = new BehaviorSubject<string>(localStorage.getItem('Menu'));
    this._MenuArrayBehaviorSubject = new BehaviorSubject<Array<Menu>>(JSON.parse(localStorage.getItem('MenuArray')));
  }


  private GetLinkFather(url: string, icon: string, name: string) {
    return '<li class="">' +
      '<a href="' + url + '"><i class="menu-icon ' + icon + '"></i>' + name + ' </a>' +
      '</li>';
  }

  private GetLinkChildren(url: string, icon: string, name: string) {
    return '<li><i class="' + icon + '"></i><a href="' + url + '">' + name + '</a></li>';
  }

  private GetMenuFather(ListChildren: Array<Menu>, Father: Menu) {

    var templateFhather =
      '<li class="menu-item-has-children dropdown">' +
      '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="menu-icon ' + Father.Icon + '"></i>' + Father.MenuName + '</a>' +
      '<ul class="sub-menu children dropdown-menu">';

    //Recorriendo los hijos y asignandole a su menu padre
    ListChildren.forEach(c => {
      templateFhather += this.GetLinkChildren(c.Url, c.Icon, c.MenuName);
    });

    templateFhather += '</ul></li>';

    return templateFhather;
  }

  private GetMenuString(ListMenu: Array<Menu>) {

    var _MenuString = '';

    //Obteniendo los menus padres
    var Father = ListMenu.filter(x => x.FatherMenuId == null);

    //recorriendo los padres y obteniendo sus hijos
    Father.forEach(f => {

      if (f.Url == '#') { //Tiene hijos

        //Obtenemos el menu padre con sus hijos   
        _MenuString += this.GetMenuFather(ListMenu.filter(x => x.FatherMenuId == f.MenuId), f);

      } else { //No tiene hijo ni tiene padre

        //concatenamos el menu al string
        _MenuString += this.GetLinkFather(f.Url, f.Icon, f.MenuName);
      }

    });

    return _MenuString;
  }

  //Funcion que retorna el menu en formato de HtmlString desde un localStorage con BehaviorSubject
  GetMenu() {

    //se realiza la peticion hacia el api
    return this._httpClient.post<any>(environment.ApiUrl + '/GetMenu', {}, this._httpOptions)
      .pipe(map(result => {

        //Array o resultado
        var _ArrayList = new Array<Menu>();

        //se obtiene el resultado de la lista de menus
        var _Items = result.result;

        // se recorren los elementos y se agregan a la lista del array

        _Items.forEach(element => {
          //se crea el nuevo objeto de menu
          var _Menu = new Menu();

          //se setean los valores
          _Menu.MenuId = element.menuId;
          _Menu.MenuName = element.menuName;
          _Menu.Url = element.url;
          _Menu.Icon = element.icon;
          _Menu.Position = element.position;
          _Menu.FatherMenuId = element.fatherMenuId;

          //se agregan al array
          _ArrayList.push(_Menu);

        }) //fin ForEach

        //Obtenemos el menuString
        var _MenuString = this.GetMenuString(_ArrayList);

        //Guardamos en el local Store en formato HtmlString
        localStorage.setItem('Menu', _MenuString);
        this._MenuBehaviorSubject.next(_MenuString);

        //Guardamos en el local Store el menu en Formato array
        localStorage.setItem('MenuArray', JSON.stringify(_ArrayList));
        this._MenuArrayBehaviorSubject.next(_ArrayList);

        return this.GetCurrentMenu();

      })); //Fin de la peticion hacia el api que obtiene la informacion del usuario    
  }

  GetCurrentMenu(): string {
    return this._MenuBehaviorSubject.value
  }


  //Funcion que retorna el menu en formato de array desde un localStorage con BehaviorSubject
  GetMenuArray() {

    //se realiza la peticion hacia el api
    return this._httpClient.post<any>(environment.ApiUrl + '/GetMenu', {}, this._httpOptions)
      .pipe(map(result => {

        //Array o resultado
        var _ArrayList = new Array<Menu>();

        //se obtiene el resultado de la lista de menus
        var _Items = result.result;

        // se recorren los elementos y se agregan a la lista del array

        _Items.forEach(element => {
          //se crea el nuevo objeto de menu
          var _Menu = new Menu();

          //se setean los valores
          _Menu.MenuId = element.menuId;
          _Menu.MenuName = element.menuName;
          _Menu.Url = element.url;
          _Menu.Icon = element.icon;
          _Menu.Position = element.position;
          _Menu.FatherMenuId = element.fatherMenuId;

          //se agregan al array
          _ArrayList.push(_Menu);

        }) //fin ForEach

        //Guardamos en el local Store el menu en Formato array
        localStorage.setItem('MenuArray', JSON.stringify(_ArrayList));
        this._MenuArrayBehaviorSubject.next(_ArrayList);

        return this.GetCurrentMenuArray();

      })); //Fin de la peticion hacia el api que obtiene la informacion del usuario    
  }

  GetCurrentMenuArray(): Array<Menu> {
    return this._MenuArrayBehaviorSubject.value;
  }

}