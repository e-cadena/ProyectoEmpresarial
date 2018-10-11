import { Component, OnInit } from '@angular/core';
import { InicioService } from '../Services/inicio.service';
import { ArduinoComp } from '../Interfaces/arduino-comp';
import { Producto } from '../Interfaces/producto';
import { ArduinoServiceService } from '../Services/arduino-service.service';
import { ProductoService } from '../Services/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  arduinocomp: ArduinoComp = {
    nombre: '',
    version: '',
    direccion: ''
  }

  product: any = {
    id: 0,
    nombreProducto: ''
  };
  
  constructor(public inicioServ:InicioService, public arduinoServ:ArduinoServiceService) { }
  
  gets(inic: InicioComponent){
    console.log(inic)
  }

  ngOnInit() {
    this.getProveedor();
    this.getPlataforma();
    this.get();
   }
  
  productosList:any;
  providerList:any;
  plataformaList:any;

  getProveedor(){
    this.arduinoServ.getProveedor().subscribe((result)=>{
      console.log(result);
      this.providerList = result;
    })
  }

  getPlataforma(){
    this.arduinoServ.getPlataforma().subscribe((result)=>{
      console.log(result);
      this.plataformaList = result;
    })
  }

  get(){
    this.arduinoServ.getProducto().subscribe((result)=>{
      console.log(result);
      this.productosList = result;
    })
  }

  getInic(id){
    let idInic: any = ""
    this.arduinoServ.getById(id).subscribe((tipoInic:any)=>{
      console.log(tipoInic.body.usuario);
      idInic = tipoInic.body.usuario;
      return idInic
    });
    return idInic
  }
  
   
}
