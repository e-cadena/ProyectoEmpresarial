import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ArduinoServiceService } from './Services/arduino-service.service';
import { HttpClientModule } from '@angular/common/http';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { ProductoComponent } from './producto/producto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProveedorService } from './Services/proveedor.service';
import { ProductoService } from './Services/producto.service';
import { PlataformaService } from './Services/plataforma.service';
import { InicioService } from './Services/inicio.service';
import { LoginComponent } from './login/login.component';
import { ApiService } from './Services/api.service';
import { CustomerService } from './Services/customer.service';


@NgModule({
  declarations: [
    AppComponent,
    PlataformaComponent,
    ProductoComponent,
    ProveedorComponent,
    InicioComponent,
    LoginComponent
  
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [ ArduinoServiceService,
    ProveedorService,
    ProductoService,
    PlataformaService,
    InicioService,
    ApiService,
    CustomerService

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

