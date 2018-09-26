import { ArduinoComp } from './Interfaces/arduino-comp';
import { Component } from '@angular/core';
import { ArduinoServiceService } from './Services/arduino-service.service';
import { Producto } from './Interfaces/producto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: any = {
    usuario: "",
    password: ""
  }

  constructor(public arduinoServ:ArduinoServiceService) { }

  title = 'AR-Inventario';
  inTab:number = 0;
  ingreso:boolean =true;
  loginList:any;

  ngOnInit(){ 

  }

  changeTab(num:any){
    this.inTab = num;
  }

  Ingresar(user){
   //this.ingreso = true 
   this.getUsuario(user)
  }

  Cerrar(){
    this.ingreso = true
  }

  getUsuario(user){
    this.arduinoServ.getUsuario(user).subscribe((user)=>{
      console.log("Ustes es:" +user);
      this.loginList = user
    })
  }
}
