import { Component, OnInit, ViewChild } from '@angular/core';

//AgGrid
import { AgGridAngular } from "ag-grid-angular";
import { MessageService } from "primeng/api";

import { CodeService } from '../../../Services/code.service';
import { Code } from '../../../Entities/Code.model';

@Component({
  selector: 'app-decoding',
  templateUrl: './decoding.component.html',
  styleUrls: ['./decoding.component.css']
})
export class DecodingComponent implements OnInit {

  constructor(private _CodeService: CodeService, private _MessageService: MessageService) { }

  ngOnInit() {
  }

  public Loading: boolean = false;

  //AG GRID
  @ViewChild("agRevision", { static: false }) agRevision: AgGridAngular;
  @ViewChild("agProductos", { static: false }) agProductos: AgGridAngular;

  /*
  DECLARACION DE VARIABLES
*/

  //Busqueda
  description: string = "";

  //Tipo Filtro
  tipoFiltro: string = "true";

  //contendra las decodificaciones para revisar
  dataRevision: Code[] = [];

  //Configuracion de las columnas del grid Revision
  columnRevision = [
    { headerName: "code", field: "code", filter: true, width: 140, resizable: true },
    { headerName: "type", field: "type", filter: true, width: 150, resizable: true },
    { headerName: "cm", field: "length", filter: true, width: 70, resizable: true },
    { headerName: "color", field: "color", filter: true, width: 100, resizable: true },
    { headerName: "usp", field: "diameter", filter: true, width: 70, resizable: true },
    { headerName: "mm", field: "needleLength", filter: true, width: 70, resizable: true },
    { headerName: "curvature", field: "curvature", filter: true, width: 150, resizable: true },
    { headerName: "cross section", field: "crossSection", filter: true, width: 150, resizable: true }
  ];

  //Configuracion de edicion y seleccion multiplea para el grid Revision
  ColumnEditRevision = { editable: true };
  rowSelectionRevision = "multiple";

  //Lista de Productos
  dataProduct: Code[] = [];

  //Configuracion de las columnas del grid Productos
  columnProducts = [
    { headerName: "code", field: "code", filter: true, resizable: true },
    { headerName: "type", field: "type", filter: true, resizable: true },
    { headerName: "cm", field: "length", filter: true, width: 100, resizable: true },
    { headerName: "color", field: "color", filter: true, width: 150, resizable: true },
    { headerName: "usp", field: "diameter", filter: true, width: 100, resizable: true },
    { headerName: "mm", field: "needleLength", filter: true, width: 100, resizable: true },
    { headerName: "curvature", field: "curvature", filter: true, resizable: true },
    { headerName: "cross section", field: "crossSection", filter: true, resizable: true }
  ];

  //Configuracion de edicion y seleccion multiplea para el grid Revision
  ColumnEditProducts = { editable: false };
  rowSelectionProducts = "multiple";

  selectedAll() {
    this.agRevision.api.selectAll();
  }

  AddSelectedRows() {
    //debugger;

    //Obtenemos la lista seleccionada del grid Revision
    var selectedRows = this.agRevision.api.getSelectedRows();
    var selectedNode = this.agRevision.api.getSelectedNodes();

    var valido = true;

    //si hay elementos seleccionados se agrega a la lista de productos
    if (selectedRows.length > 0) {
      //se valida que el material, el centimetro y el color y usp no sean nulos
      for (let i = 0; i < selectedRows.length; i++) {
        //console.log(selectedRows[i].type);
        if (
          selectedRows[i].type === null ||
          selectedRows[i].cm === null ||
          selectedRows[i].color === null ||
          selectedRows[i].usp === null
        ) {
          valido = false;
          break;
        }

        //se valida que no sean vacios
        if (
          selectedRows[i].type === "" ||
          selectedRows[i].cm === "" ||
          selectedRows[i].color === "" ||
          selectedRows[i].usp === ""
        ) {
          valido = false;
          break;
        }
      }

      //si es valido se agrega a la lista
      if (valido) {
        //Agregamos el item al grid productos con un array
        this.agProductos.api.addItems(selectedRows);

        //eliminamos data de revisiones con un node
        this.agRevision.api.removeItems(selectedNode);
      } else {
        this._MessageService.add({
          severity: "info",
          summary: "Information",
          detail: "Please validate incomplete codes"
        });
      }
    } else {
      this._MessageService.add({
        severity: "info",
        summary: "Information",
        detail: "not selected"
      });
    }
  }

  RemoveSelectedRows() {
    //debugger;

    var selectedRows = this.agRevision.api.getSelectedNodes();

    if (selectedRows.length > 0) {
      //Seleminamos los elementos seleccionados
      this.agRevision.api.removeItems(selectedRows);
    } else {
      this._MessageService.add({
        severity: "info",
        summary: "Information",
        detail: "not selected"
      });
    }
  }

  CleanResul() {
    this.agRevision.api.selectAll();
    this.agRevision.api.removeItems(this.agRevision.api.getSelectedNodes());
  }

  selectedAllProducts() {
    this.agProductos.api.selectAll();
  }

  CleanProducts() {
    this.agProductos.api.selectAll();
    this.agProductos.api.removeItems(this.agProductos.api.getSelectedNodes());
  }

  RemoveSelecProduct() {
    var selectedRows = this.agProductos.api.getSelectedNodes();

    if (selectedRows.length > 0) {
      this.agProductos.api.removeItems(this.agProductos.api.getSelectedNodes());
    } else {
      this._MessageService.add({
        severity: "info",
        summary: "Information",
        detail: "not selected"
      });
    }
  }

  onCellEditingstarted(e) {
    //var editing = this.agRevision.api.getEditingCells();
    //console.log(e);
  }

  onCellEditingStop(e) {
    //debugger;

    //Loading
    this.Loading = true;

    //se obtiene las filas
    //var selecteRow = this.agRevision.api.getSelectedRows();

    //parametros que se definiran al servicio de codificacion por parametros
    var parametros = e.data;
    //console.log(parametros);

    //se hace el consumo por parametros
    this._CodeService
      .GetCodeByParameter(
        parametros.type,
        parametros.length,
        parametros.color,
        parametros.diameter,
        parametros.needleLength,
        parametros.curvature,
        parametros.crossSection
      )
      .subscribe(
        data => {
          e.data.code = data[0].code;
          e.data.type = data[0].type;
          e.data.cm = data[0].cm;
          e.data.color = data[0].color;
          e.data.diameter = data[0].diameter;
          e.data.needleLength = data[0].needleLength;
          e.data.curvature = data[0].curvature;
          e.data.crossSection = data[0].crossSection;

          //Refrescar grid
          var itemsToUpdate = [];
          var res = this.agRevision.api.updateRowData({
            update: itemsToUpdate
          });

          //Loading
          this.Loading = false;

        },
        error => {

          //Loading
          this.Loading = false;

          this._MessageService.add({
            severity: "error",
            summary: "Error",
            detail: "" + error + ""
          });
        }
      );
  }

  Process() {
    if (this.description.trim() === "") {
      this._MessageService.add({
        severity: "info",
        summary: "Information",
        detail: "there is no data"
      });
    } else {
      this.dataRevision = null;

      //Busqueda por Descripcion
      if (this.tipoFiltro == "true") {
        this.GetMassCodingByDescription();
      } else {
        //Busqueda por codigo demetech
        this.GetMassDecodingByCode();
      }
    }
  }

  ProcessClear() {
    this.description = '';
  }

  //proceso para la descodificacion masiva por medio de descripciones
  GetMassCodingByDescription() {
    //Descripciones a buscar a buscar
    this.description = this.description.toString().trim();
    var lines = this.description.split("\n");
    var descriptions = "";

    //para agregar al primer elemento un enter
    if (lines.length == 1) {
      lines[0] += "\n";
    }

    //se recorre cada item para realizar el consumo
    for (var i = 0; i < lines.length; i++) {
      descriptions += lines[i].toString().trim() + "|";
    }

    //Loading
    this.Loading = true;

    this._CodeService.GetMassCodingByDescription(descriptions).subscribe(
      data => {
        this.dataRevision = data;

        //Loading
        this.Loading = false;
      },
      error => {

        //Loading
        this.Loading = false;

        this.dataRevision = [];
        this._MessageService.add({
          severity: "warn",
          summary: "Warning",
          detail: "overflow"
        });
        console.log(error);
      }
    );
  }

  //Proceso para la decodificacion masiva por codigo demetech
  GetMassDecodingByCode() {
    //Codigos demetech a buscar
    this.description = this.description.toString().trim();
    var lines = this.description.split("\n");

    var codes = "";

    //para agregar al primer elemento un enter
    if (lines.length == 1) {
      lines[0] += "\n";
    }

    //se recorre cada item para realizar el consumo
    for (var i = 0; i < lines.length; i++) {
      codes += lines[i].toString().trim() + "|";
    }

    //Loading
    this.Loading = true;

    this._CodeService.GetMassDecodingByCodeDemetech(codes).subscribe(
      data => {
        this.dataRevision = data;
        //Loading
        this.Loading = false;
      },
      error => {

        //Loading
        this.Loading = false;

        this.dataRevision = [];
        this._MessageService.add({
          severity: "warn",
          summary: "Warning",
          detail: "overflow"
        });
        console.log(error);
      }
    );
  }

  //Export
  onExport() {
    var params = {
      fileName: "Export",
      sheetName: "Sheet1"
    };
    //this.gridApi.exportDataAsExcel(params);

    this.agRevision.api.exportDataAsExcel(params);
  }

}
