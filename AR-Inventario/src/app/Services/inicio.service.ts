import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  url:string = "http://192.168.7.85:3000"
  constructor(private http: HttpClient) { }

  getById(idTipo){
    return this.http.get(
      this.url+"/tipoProducto/id", {params: {
        idTProduct: JSON.stringify(idTipo)
    },
      observe: 'response'
    });
  }
}
