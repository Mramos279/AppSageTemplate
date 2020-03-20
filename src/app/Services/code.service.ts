import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private _HttpClient: HttpClient) {

  }

  GetCodeByDescription(Description: string) {

    try {
      return this._HttpClient.get<any>(environment.ApiUrl + '/CodeByDescription?Description=' + Description);
    } catch (error) {
      console.log(error);
    }

  }

  GetMassCodingByDescription(Descriptions: string) {

    try {
      return this._HttpClient.get<any>(environment.ApiUrl + '/MassCodingByDescription?Descriptions=' + Descriptions);
    } catch (error) {
      console.log(error);
    }

  }


  GetCodeByParameter(Type: string, Length: string, Color: string, Diameter: string, NeedleLength: string, Curvature: string, CrossSection: string) {

    try {

      let parameters = 'type=' + Type +
        '&cm=' + Length +
        '&color=' + Color +
        '&usp=' + Diameter +
        '&mm=' + NeedleLength +
        '&curvature=' + Curvature +
        '&crossSection=' + CrossSection;

      return this._HttpClient.get<any>(environment.ApiUrl + '/CodeByParameter?' + parameters);
    } catch (error) {
      console.log(error);
    }

  }

  GetDecoodeByCodeDemetech(Code: string) {

    try {
      return this._HttpClient.get<any>(environment.ApiUrl + '/DecodeByCodeDeme?Code=' + Code);
    } catch (error) {
      console.log(error);
    }

  }

  GetMassDecodingByCodeDemetech(Codes: string) {

    debugger;

    try {
      return this._HttpClient.get<any>(environment.ApiUrl + '/MassDecodingByCodeDemetech?Codes=' + Codes);
    } catch (error) {
      console.log(error);
    }

  }

}