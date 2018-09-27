import { Component, OnInit } from '@angular/core';
import { ArduinoServiceService } from '../Services/arduino-service.service';
import { ProductoService } from '../Services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
  export class ProductoComponent implements OnInit {
  
  product: any = {
    id: 0,
    nombreProducto: '',
    precioUnitario: 0.00 ,
    plataforma_placa: '',
    proveedor_nombreProveedor: ''
  };
  
  constructor(public productoServ:ProductoService, public arduinoServ:ArduinoServiceService) { }
  
  gets(inic: ProductoComponent){
    console.log(inic)
  }

  ngOnInit() {
    this.get();
    this.getPlataforma();
    this.getProveedor();
  }

  providerList:any;
  plataformaList: any;
  productosList:any;

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

  add(product){
    console.log(product)
     this.arduinoServ.add(product).subscribe((result) =>{
      console.log("Creado:" + result);
    this.get();
     })
  }

  update(product){
    this.arduinoServ.update(product).subscribe((result) =>{
      console.log("Actualizado:" + result);
      this.get();
    })
  }

  delete(id){
    console.log(id);
    this.arduinoServ.delete(id).subscribe((result)=>{
        console.log("Eliminado: "+ id);
        this.get();
    })
  } 

  getTipo(id){
    let idtipo: any = ""
    this.arduinoServ.getById(id).subscribe((tipoResult:any)=>{
      console.log(tipoResult.body.nombreProducto);
      idtipo = tipoResult.body.nombreProducto;
      return idtipo 
    });
    return idtipo
  }

  onSelectProducto(event){
    console.log(event)
  }
}
