import { Component, OnInit } from '@angular/core';
import { PlataformaService } from '../Services/plataforma.service';
import { ArduinoServiceService } from '../Services/arduino-service.service';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.component.html',
  styleUrls: ['./plataforma.component.css']
})
export class PlataformaComponent implements OnInit {

  constructor(public arduinoServ: ArduinoServiceService) { }

  plataforma: any ={
    placa: "",
    version: ""
  }

  gett(plat: PlataformaComponent){
    console.log(plat)
  }
  
  ngOnInit() {
    this.getPlataforma();
  }

  plataformaList:any;

  //funciones plataforma
  getPlataforma(){
    this.arduinoServ.getPlataforma().subscribe((result)=>{
      console.log(result);
      this.plataformaList = result;
    })
  }

  addPlataforma(plataforma){
    this.arduinoServ.addPlataforma(plataforma).subscribe((result) =>{
      console.log("Creado:" + result);
      this.getPlataforma();
      alert("Creado con éxito! :)");
    })
  }

  updatePlataforma(plataforma){
    this.arduinoServ.updatePlataforma(plataforma).subscribe((result) =>{
      console.log("Actualizado:" + result);
      this.getPlataforma();
      alert("Actualizado con éxito! :D");
    })
  }

  deletePlataforma(id){
    console.log(id);
    this.arduinoServ.deletePlataforma(id).subscribe((id)=>{
        console.log("Eliminado: "+ id);
        this.getPlataforma();
        alert("Eliminado con éxito! :0");
    })
  }
  getPlat(id){
    let idPlat: any = ""
    this.arduinoServ.getById(id).subscribe((tipoPlat:any)=>{
      console.log(tipoPlat.body.placa);
      idPlat = tipoPlat.body.placa;
      return idPlat 
    });
    return idPlat
  } 
}
