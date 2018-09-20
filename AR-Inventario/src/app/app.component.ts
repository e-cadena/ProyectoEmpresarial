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
  title = 'AR-Inventario';
  
  inTab:number = 0;
  
  changeTab(num:any){
    this.inTab = num;
  }
}
