import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArduinoServiceService {

  url:string = "http://192.168.7.85:3000"
  //url:string = "localhost"
  constructor(private http: HttpClient) { }

  //Inicio
  getValue(ProductoService)  {
    return ProductoService.nombreProducto
  }

  //Producto
  getProducto(){
    return this.http.get(this.url+"/Producto")
  }
  
  add(product){
    return this.http.get(
    this.url+"/Producto/add", {params: {
      product: JSON.stringify(product)
    },
      observe: 'response'
    });
  }
  
  update(product){
    product.nombreProducto = "Raspberry"
    return this.http.get(
    this.url+"/Producto/update", {params: {
      product: JSON.stringify(product)
    },
      observe: 'response'
    });
  }
  
  delete(idProduct){
    return this.http.get(
    this.url+"/Producto/delete",{params: {
      id: idProduct
    },
      observe: 'response'
    });
  }
  
  getById(idTipo){
    return this.http.get(
    this.url+"/tipoProducto/id", {params: {
      idTProduct: JSON.stringify(idTipo)
    },
      observe: 'response'
    });
  }

  //Proveedor
  getProveedor(){
    return this.http.get(this.url+"/Proveedor")
  }
  
  addProveedor(proveedor){
    return this.http.get(
    this.url+"/Proveedor/add", {params: {
      proveedor: JSON.stringify(proveedor)
    },
      observe: 'response'
    });
  }

  updateProveedor(proveedor){
    proveedor.nombreProveedor = "Electronica123"
    return this.http.get(
    this.url+"/Proveedor/update", {params: {
      proveedor: JSON.stringify(proveedor)
    },
      observe: 'response'
    });
  }

  deleteProveedor(idProveedor){
    return this.http.get(
    this.url+"/Proveedor/delete",{params: {
      id: idProveedor
    },
      observe: 'response'
    });
  }
  
  getByIdProveedor(idProv){
    return this.http.get(
    this.url+"/Plataforma/id", {params: {
      idTProv: JSON.stringify(idProv)
    },
      observe: 'response'
    });
  }

  //Plataforma
  getPlataforma(){
    return this.http.get(this.url+"/Plataforma")
  }

  addPlataforma(plataforma){
    return this.http.get(
    this.url+"/Plataforma/add", {params: {
      plataforma: JSON.stringify(plataforma)
    },
      observe: 'response'
    });
  }

  updatePlataforma(plataforma){
    plataforma.placa = "",
    plataforma.version =""
    return this.http.get(
    this.url+"/Plataforma/update", {params: {
      plataforma: JSON.stringify(plataforma)
    },
      observe: 'response'
    });
  }

  deletePlataforma(idPlataforma){
    return this.http.get(
    this.url+"/Plataforma/delete",{params: {
      id: idPlataforma
    },
      observe: 'response'
    });
  }
  
  getByIdPlataforma(idProv){
    return this.http.get(
    this.url+"/Plataforma/id", {params: {
      idTPlat: JSON.stringify(idProv)
    },
      observe: 'response'
    });
  }
  
  //Funciones del modal
  open(id: string) {
    // open modal specified by id
    let modal: any = this.url+"/Producto/add";
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    let modal: any = this.url+"/Producto/add";
    modal.close();
  }

  //Funciones actualizar modal
  openProducto(id: string) {
    // open modal specified by id
    let modal: any = this.url+"/Proveedor/update";
    modal.openProducto();
  }

  closeProducto(id: string) {
    // close modal specified by id
    let modal: any = this.url+"/Proveedor/update";
    modal.closeProducto();
  }

  getUsuario(user){
    return this.http.get(
    this.url+"/User/login", {params: {
      user: JSON.stringify(user)
    },
      observe: 'response'
    })
  }

  getProductoB(product){
    return this.http.get(
    this.url+"/Producto/busqueda", {params: {
      product: JSON.stringify(product)
    },
      observe: 'response'
    })
  }
}
