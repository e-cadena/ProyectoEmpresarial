import { Component, OnInit } from '@angular/core';
import { InicioService } from '../Services/inicio.service';
import { ArduinoComp } from '../Interfaces/arduino-comp';
import { Producto } from '../Interfaces/producto';
import { ArduinoServiceService } from '../Services/arduino-service.service';

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
 
  titulo = 'AR-Inventario'
  producto: Producto = {
    id: 0,
    nombreProducto: '',
    precioUnitario: 0 
  };
  
  constructor(public inicioServ:InicioService, public arduinoServ:ArduinoServiceService) { }
  
  gets(inic: InicioComponent){
    console.log(inic)
  }

  
  ngOnInit() {
    
  }
  

  productosList:any;


 
  enviar(comp: ArduinoComp) {
    console.log(comp);
  }

  //funciones producto
  get(){
    this.arduinoServ.getProducto().subscribe((result)=>{
      console.log(result);
      this.productosList = result;
    })
  }

  add(product){
    this.arduinoServ.add(product).subscribe((result) =>{
      console.log("Creado:" + result);
      this.get();
    })
  }

  update(product){
    //console.log(product);
    this.arduinoServ.update(product).subscribe((result) =>{
      console.log("Actualizado:" + result);
      this.get();
    })
  }

  delete(id){
    console.log(id);
    this.arduinoServ.delete(id).subscribe((id)=>{
        console.log("Eliminado: "+ id);
        this.get();
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
