import { Component, OnInit } from '@angular/core';
import { ArduinoServiceService } from '../Services/arduino-service.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  constructor(public arduinoServ: ArduinoServiceService) { }

  proveedor:any = {
    nombreProveedor: "",
    direccion: "",
    telefono: 0,
    horario: "00:00",
    contactosWeb: "",
    sucursal: "",
    sector: ""
  }
  get(prov: ProveedorComponent){
    console.log(prov)
  }

  ngOnInit() {
    this.getProveedor();
  }

  providerList:any;
  
    //funciones producto
   getProveedor(){
    this.arduinoServ.getProveedor().subscribe((result)=>{
      console.log(result);
      this.providerList = result;
    })
  }

  addProveedor(proveedor){
    this.arduinoServ.addProveedor(proveedor).subscribe((result) =>{
      console.log("Creado:" + result);
      this.getProveedor();
    })
  }

  updateProveedor(proveedor){
    this.arduinoServ.updateProveedor(proveedor).subscribe((result) =>{
      console.log("Actualizado:" + result);
      this.getProveedor();
    })
  }

  deleteProveedor(id){
    console.log(id);
    this.arduinoServ.deleteProveedor(id).subscribe((result)=>{
        console.log("Eliminado: "+ id);
        this.getProveedor();
    })
  } 
  getProv(id){
    let idProv: any = ""
    this.arduinoServ.getById(id).subscribe((tipoProv:any)=>{
      console.log(tipoProv.body.nombreProveedor);
      idProv = tipoProv.body.nombreProveedor;
      return idProv 
    });
    return idProv
  }
}
