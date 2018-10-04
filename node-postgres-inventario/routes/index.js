var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('Inventario', 'postgres', '1234', {
  host: '192.168.7.133',
  //host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


//modelos de tablas
//Tabla Usuario
const User = sequelize.define('Usuario', {
  usuario: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

//tabla Plataformas
const Plataforma = sequelize.define('Plataformas', {
  placa: {
    type: Sequelize.STRING
  },
  version: {
    type: Sequelize.STRING
  }
});

//tabla Proveedores
const Proveedor = sequelize.define('Proveedores', {
  nombreProveedor: {
    type: Sequelize.STRING
  },
  direccion: {
    type: Sequelize.STRING
  },
  telefono: {
    type: Sequelize.STRING
  },
  horario: {
    type: Sequelize.STRING
  },
  contactosWeb: {
    type: Sequelize.STRING
  },
  sucursal: {
    type: Sequelize.STRING
  },
  sector: {
    type: Sequelize.STRING
  }
});

//tabla tipoProductos
const tipoProducto = sequelize.define('tipoProductos', {
  nombreProducto: {
    type: Sequelize.STRING
  }
});

//tabla Productos
const Producto  = sequelize.define('Productos', {
  nombreProducto: {
    type: Sequelize.STRING
  },
  precioUnitario: {
    type: Sequelize.STRING
  },
  tipo_id: {
    type: Sequelize.INTEGER,
    references: {
      model: tipoProducto,
      key: "id"
    },
    associate: function(modelos){
      modelos.Producto.hasMany(modelos.tipoProducto)
    }
  },
  plataforma_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Plataforma,
      key: "id"
    },
    associate: function(modelos){
      modelos.Producto.hasOne(modelos.Plataforma)
    }
  }
});

//tabla ProductorxProveedor
const ProductosxProveedor = sequelize.define('ProductosxProveedor', {
      proveedor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: Proveedor,
          key: "id"
        },
        associate: function(modelos){
          modelos.ProductosxProveedor.hasMany(modelos.Proveedor)
        }
      },
      producto_id: {
        type: Sequelize.INTEGER,
        references: {
          model: Producto,
          key: "id"
        },
        associate: function(modelos){
          modelos.ProductosxProveedor.hasMany(modelos.Producto)
        }
      }
  });
 
//tabla Facturas
const Factura = sequelize.define('Facturas', {
  numeroFactura: {
    type: Sequelize.STRING
  },
  iva: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.STRING
  },
  subTotal: {
    type: Sequelize.STRING
  }
});
  

//tabla detalleFacturas
const detalleFactura = sequelize.define('detalleFacturas', {
  precio: {
    type: Sequelize.STRING
  },
  cantidad: {
    type: Sequelize.STRING
  },
  valorTotal: {
    type: Sequelize.STRING
  },
  producto_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Producto,
      key: "id"
    },
    associate: function(modelos){
      modelos.detalleFactura.hasMany(modelos.Producto)
    }
  },
  factura_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Factura,
      key: "id"
    },
    associate: function(modelos){
      modelos.detalleFactura.hasMany(modelos.Factura)
    }
  }
});



/*
//force: true will drop the table if it already exists Usuario
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    usuario: 'Esteban',
    password: 'esteban12345',
  });
}); 

//force: true will drop the table if it already exists Plataformas
Plataforma.sync({force: true}).then(() => {
  // Table created
  return Plataforma.create({
    placa: 'Arduino',
    version: 'Leonardo'
  });
});

//force: true will drop the table if it already exists Productos
Producto.sync({force: true}).then(() => {
  // Table created
  return Producto.create({
    nombreProducto: 'Sensor',
    precioUnitario: '5.00'
  });
});

//force: true will drop the table if it already exists Proveedores
Proveedor.sync({force: true}).then(() => {
  // Table created
  return Proveedor.create({
    nombreProveedor: 'Electronica Nacional',
    direccion: 'Colon',
    telefono: '3552147',
    horario: '7:00 am',
    contactosWeb: 'www.electronica@hotmail.com',
    sucursal: ' EN 2',
    sector: 'Sur'
    
  });
});

//force: true will drop the table if it already exists ProductosxProveedor
ProductosxProveedor.sync({force: true}).then(() => {
    // Table created
    return ProductosxProveedor.create({
  
    });
  });

//force: true will drop the table if it already exists tipoProductos
tipoProducto.sync({force: true}).then(() => {
  // Table created
  return tipoProducto.create({
    nombreProducto: 'Arduino'
   
  });
});

//force: true will drop the table if it already exists Facturas
Factura.sync({force: true}).then(() => {
  // Table created
  return Factura.create({
    numeroFactura: '001',
    iva: '12',
    total:'35.00',
    subTotal: '32.00'
  });
});

//force: true will drop the table if it already exists detalleFactura
detalleFactura.sync({force: true}).then(() => {
  // Table created
  return detalleFactura.create({
    precio: '8.00',
    cantidad: '4',
    valorTotal:'32.00'
  });
});
*/



//Usuario -> todos los usuarios
router.get('/Usuario', function(req, res, next) {
  User.findAll().then(users => {
      res.send(users);
  })
});

//Usuarios/add -> añadir un nuevo usuario
router.get('/Usuario/add', function(req, res, next) {
  User.build({
    usuario: 'Henry',
    password: '1234'
  }).save()
  .then(user => {
    res.send(user);
  })
  .catch(error => {
    console.log(error)
  })

});

//Usuarios/update -> modificar unicamente el nombre
router.get('/Usuario/update', function(req, res, next) {
  User.findById(7).then(userId =>{
    if(userId != null){
      userId.update({usuario:"Lucho",password: userId.password})
        .then(update =>{
          res.send(update);
        })
        .catch(error => {
          console.log(error)
        });
    }else{
      res.send({error: "No encontrado para actualizar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//Usuarios/delete -> eliminar el usuario cualquiera
router.get('/Usuario/delete', function(req, res, next) {
   User.findById(9).then(userId =>{
    if(userId != null){ 
    userId.destroy()
     .then(destroy =>{
       res.send(destroy)
     })
     .catch(error => {
      console.log(error)
    });
  }else{
    res.send({error: "No encontrado para eliminar"});
    }
  }).catch(error => {
    console.log(error)
  });
});





//CRUD ProductosxProveedor
//ProductosxProveedor -> todos los ProductosxProveedor
router.get('/ProductosxProveedor', function(req, res, next) {
  ProductosxProveedor.findAll().then(ProductosxProveedor => {
      res.send(ProductosxProveedor);
  })
});

//ProductosxProveedor/add -> añadir un nuevo ProductosxProveedor
router.get('/ProductosxProveedor/add', function(req, res, next) {
  ProductosxProveedor.build({
    proveedor_id: 1,
    producto_id: 1
  }).save()
  .then(ProductosxProveedor => {
    res.send(ProductosxProveedor);
  })
  .catch(error => {
    console.log(error)
  })
});

//ProductosxProveedor/update -> modificar 
router.get('/ProductosxProveedor/update', function(req, res, next) {
  ProductosxProveedor.findById(1).then(ProductosxProveedor =>{
    if(ProductosxProveedor != null){
      ProductosxProveedor.update({proveedor_id: '1',producto_id: '1'})
        .then(update =>{
          res.send(update);
        })
        .catch(error => {
          console.log(error)
        });
    }else{
      res.send({error: "No encontrado para actualizar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//ProductosxProveedor/delete -> eliminar 
router.get('/ProductosxProveedor/delete', function(req, res, next) {
  
  ProductosxProveedor.findById(2).then(ProductosxProveedor =>{
    if(ProductosxProveedor != null){ 
      ProductosxProveedor.destroy()
     .then(destroy =>{
       res.send(destroy)
     })
     .catch(error => {
      console.log(error)
    });
  }else{
    res.send({error: "No encontrado para eliminar"});
    }
  }).catch(error => {
    console.log(error)
  });
});




//CRUD DETALLE FACTURA
//detalleFacturas-> todos los detalles de factura
router.get('/detalleFactura', function(req, res, next) {
  detalleFactura.findAll().then(detalleFactura => {
      res.send(detalleFactura);
  })
});

//detalleFacturas/add -> añadir un nuevo detalleFactura
router.get('/detalleFactura/add', function(req, res, next) {
  detalleFactura.build({
    numeroFactura: '001',
     precio: '9.00',
     cantidad: '4',
     valorTotal:'36.00',
     producto_id: 3,
     factura_id: 2
  }).save()
  .then(detalleFactura => {
    res.send(detalleFactura);
  })
  .catch(error => {
    console.log(error)
  })
});

//detalleFacturas/update -> modificar 
router.get('/detalleFactura/update', function(req, res, next) {
  detalleFactura.findById(1).then(detalleFactura =>{
    if(detalleFactura != null){
      detalleFactura.update({producto_id: 1, factura_id: 2})
        .then(update =>{
          res.send(update);
        })
        .catch(error => {
          console.log(error)
        });
    }else{
      res.send({error: "No encontrado para actualizar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//detalleFacturas/delete -> eliminar 
router.get('/detalleFactura/delete', function(req, res, next) {
  
  detalleFactura.findById(5).then(detalleFactura =>{
    if(detalleFactura != null){ 
      detalleFactura.destroy()
     .then(destroy =>{
       res.send(destroy)
     })
     .catch(error => {
      console.log(error)
    });
  }else{
    res.send({error: "No encontrado para eliminar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//CRUD FACTURA
//Factura-> todos las facturas
router.get('/Factura', function(req, res, next) {
  Factura.findAll().then(Factura => {
      res.send(Factura);
  })
});

//Factura/add -> añadir una nueva factura
router.get('/Factura/add', function(req, res, next) {
  Factura.build({
    numeroFactura: '001',
    iva: '12',
    total:'35.00',
    subTotal: '32.00'
  }).save()
  .then(Factura => {
    res.send(Factura);
  })
  .catch(error => {
    console.log(error)
  })
});

//Factura/update -> modificar 
router.get('/Factura/update', function(req, res, next) {
  Factura.findById(2).then(Factura =>{
    if(Factura != null){
      Factura.update({numeroFactura: '002', total:'360.00'})
        .then(update =>{
          res.send(update);
        })
        .catch(error => {
          console.log(error)
        });
    }else{
      res.send({error: "No encontrado para actualizar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//Factura/delete -> eliminar 
router.get('/Factura/delete', function(req, res, next) {
  
  Factura.findById(3).then(Factura =>{
    if(Factura != null){ 
      Factura.destroy()
     .then(destroy =>{
       res.send(destroy)
     })
     .catch(error => {
      console.log(error)
    });
  }else{
    res.send({error: "No encontrado para eliminar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//CRUD TIPO PRODUCTO
//tipoProducto -> todos los tipos de producto
router.get('/tipoProducto', function(req, res, next) {
  tipoProducto.findAll().then(tipoProducto => {
      res.send(tipoProducto);
  })
});

//tipoProducto/add -> añadir un nuevo tipo de  producto
router.get('/tipoProducto/add', function(req, res, next) {
  tipoProducto.build({
    nombreProducto: 'Sensor',
    
  }).save()
  .then(tipoProducto => {
    res.send(tipoProducto);
  })
  .catch(error => {
    console.log(error)
  })

});

//tipoProducto/update -> modificar 
router.get('/tipoProducto/update', function(req, res, next) {
  tipoProducto.findById(1).then(tipoProducto =>{
    if(tipoProducto != null){
      tipoProducto.update({ nombreProducto: 'LED'})
        .then(update =>{
          res.send(update);
        })
        .catch(error => {
          console.log(error)
        });
    }else{
      res.send({error: "No encontrado para actualizar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//tipoProducto/delete -> eliminar 
router.get('/tipoProducto/delete', function(req, res, next) {
  
  tipoProducto.findById(3).then(id_Producto =>{
    if(tipoProducto != null){ 
      tipoProducto.destroy()
     .then(destroy =>{
       console.log(req);
       res.send(destroy)
     })
     .catch(error => {
      console.log(error)
    });
  }else{
    res.send({error: "No encontrado para eliminar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

router.get('/tipoProducto/id', function(req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');
   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
  
   let idTipo = JSON.parse(req.query.idTProduct)
    tipoProducto.findById(idTipo).then(tipoProduct =>{
      res.send(tipoProduct);
    }).catch(error => {
      console.log(error)
    });

});

//CRUD INICIO
//Inicio -> todos los proveedores
router.get('/Inicio', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
 Proveedor.findAll().then(proveedor => {
     res.send(proveedor);
 })
});

//Inicio/add -> añadir un nuevo proveedor
router.get('/Inicio/add', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  let proveedor = JSON.parse(req.query.proveedor)
  Inicio.build({
          nombreProveedor: proveedor.nombreProveedor,
          direccion:       proveedor.direccion,
          telefono:        proveedor.telefono,
          horario:         proveedor.horario,
          contactosWeb:    proveedor.contactosWeb,
          sucursal:        proveedor.sucursal,
          sector:          proveedor.sector})
  .save(Inicio)
  .then(Inicio => {
    res.send(Inicio);
  })
  .catch(error => {
    console.log(error)
  })
 });
 
  //Inicio/update -> modificar 
  router.get('/Inicio/update', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  let Inicio = JSON.parse(req.query.proveedor)
  Inicio.findById(inicio.id).then(Inicio =>{
  if(Inicio != null){
    Inicio.update({ 

            })
      .then(update =>{
        res.send(update);
      })
      .catch(error => {
        console.log(error)
      });
  }else{
    res.send({error: "No encontrado para actualizar"});
  }
}).catch(error => {
  console.log(error)
  });
 });
 
 //Inicio/delete -> eliminar
 router.get('/Inicio/delete', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  Inicio.findById(req.query.id).then(Inicio =>{
    if(Inicio != null){ 
     Inicio.destroy()
     .then(destroy =>{
       res.send(destroy)
     })
     .catch(error => {
      console.log(error)
    });
  }else{
    res.send({error: "No encontrado para eliminar"});
    }
  }).catch(error => {
    console.log(error)
  });
 });

 //CRUD PRODUCTO
//Producto-> todos los productos
router.get('/Producto', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  Producto.findAll().then(producto => {
      res.send(producto);
  })
});

//Producto/add -> añadir un nuevo producto
router.get('/Producto/add', function(req, res, next) { 
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');
   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
   let producto = JSON.parse(req.query.product)

  Producto.build({
        nombreProducto:    producto.nombreProducto,
        precioUnitario:    producto.precioUnitario, 
        plataforma_placa:  plataforma.plataforma_placa, 
        nombreProveedor:   proveedor.nombreProveedor})
  .save(Producto)
  .then(Producto => {
    res.send(Producto);
  })
  .catch(error => {
    console.log(error)
  })
});

//Producto/update -> modificar unicamente el nombre
router.get('/Producto/update', function(req, res, next) {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
   let producto = JSON.parse(req.query.product)
  Producto.findById(producto.id).then(Producto =>{
    if(Producto != null){
      Producto.update({
        nombreProducto:    producto.nombreProducto,
        precioUnitario:    producto.precioUnitario, 
        plataforma_placa:  plataforma.plataforma_placa, 
        nombreProveedor:   proveedor.nombreProveedor})
        .then(update =>{
          res.send(update);
        })
        .catch(error => {
          console.log(error)
        });
    }else{
      res.send({error: "No encontrado para actualizar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//Producto/delete -> eliminar el usuario cualquiera
router.get('/Producto/delete', function(req, res, next) {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
  Producto.findById(req.query.id).then(Producto =>{
    if(Producto != null){ 
      Producto.destroy()
     .then(destroy =>{
       res.send(destroy)
     })
     .catch(error => {
      console.log(error)
    });
  }else{
    res.send({error: "No encontrado para eliminar"});
    }
  }).catch(error => {
    console.log(error)
  });
});

//CRUD PLATAFORMAS
//Plataforma -> todos las plataformas
router.get('/Plataforma', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
 Plataforma.findAll().then(plataforma => {
     res.send(plataforma);
 })
});

//Plataformas/add -> añadir un nueva plataforma
router.get('/Plataforma/add', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  let plataforma = JSON.parse(req.query.plataforma)
 Plataforma.build({
       placa:   plataforma.placa,
       version: plataforma.version})
 .save(Plataforma)
 .then(Plataforma => {
   res.send(Plataforma);
 })
 .catch(error => {
   console.log(error)
 })
});

//Plataforma/update -> modificar 
router.get('/Plataforma/update', function(req, res, next) {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
   let plataforma = JSON.parse(req.query.plataforma)
 Plataforma.findById(plataforma.id).then(Plataforma =>{
   if(Plataforma != null){
     Plataforma.update({ 
       placa:   plataforma.placa,
       version: plataforma.version})
       .then(update =>{
         res.send(update);
       })
       .catch(error => {
         console.log(error)
       });
   }else{
     res.send({error: "No encontrado para actualizar"});
   }
 }).catch(error => {
   console.log(error)
 });
});

//Plataforma/delete -> eliminar 
router.get('/Plataforma/delete', function(req, res, next) {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
 Plataforma.findById(req.query.id).then(Plataforma =>{
   if(Plataforma != null){ 
     Plataforma.destroy()
    .then(destroy =>{
      res.send(destroy)
    })
    .catch(error => {
     console.log(error)
   });
 }else{
   res.send({error: "No encontrado para eliminar"});
   }
 }).catch(error => {
   console.log(error)
 });
});

 //CRUD PROVEEDORES
//Proveedor -> todos los proveedores
router.get('/Proveedor', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
 Proveedor.findAll().then(proveedor => {
     res.send(proveedor);
 })
});

//Proveedor/add -> añadir un nuevo proveedor
router.get('/Proveedor/add', function(req, res, next) {
 // Website you wish to allow to connect
 res.setHeader('Access-Control-Allow-Origin', '*');
 // Request methods you wish to allow
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 // Set to true if you need the website to include cookies in the requests sent
 // to the API (e.g. in case you use sessions)
 res.setHeader('Access-Control-Allow-Credentials', true);
 let proveedor = JSON.parse(req.query.proveedor)
 Proveedor.build({
         nombreProveedor: proveedor.nombreProveedor,
         direccion:       proveedor.direccion,
         telefono:        proveedor.telefono,
         horario:         proveedor.horario,
         contactosWeb:    proveedor.contactosWeb,
         sucursal:        proveedor.sucursal,
         sector:          proveedor.sector})
 .save(Proveedor)
 .then(Proveedor => {
   res.send(Proveedor);
 })
 .catch(error => {
   console.log(error)
 })

});

//Proveedor/update -> modificar 
router.get('/Proveedor/update', function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  let proveedor = JSON.parse(req.query.proveedor)
 Proveedor.findById(proveedor.id).then(Proveedor =>{
   if(Proveedor != null){
     Proveedor.update({ 
             nombreProveedor: proveedor.nombreProveedor,
             direccion:       proveedor.direccion,
             telefono:        proveedor.telefono,
             horario:         proveedor.horario,
             contactosWeb:    proveedor.contactosWeb,
             sucursal:        proveedor.sucursal,
             sector:          proveedor.sector})
       .then(update =>{
         res.send(update);
       })
       .catch(error => {
         console.log(error)
       });
   }else{
     res.send({error: "No encontrado para actualizar"});
   }
 }).catch(error => {
   console.log(error)
 });
});

//Proveedor/delete -> eliminar
router.get('/Proveedor/delete', function(req, res, next) {
 // Website you wish to allow to connect
 res.setHeader('Access-Control-Allow-Origin', '*');
 // Request methods you wish to allow
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 // Set to true if you need the website to include cookies in the requests sent
 // to the API (e.g. in case you use sessions)
 res.setHeader('Access-Control-Allow-Credentials', true);
 Proveedor.findById(req.query.id).then(Proveedor =>{
  if(Proveedor != null){ 
    Proveedor.destroy()
  .then(destroy =>{
    res.send(destroy)
  })
  .catch(error => {
    console.log(error)
  });
  }else{
    res.send({error: "No encontrado para eliminar"});
    }
  }).catch(error => {
    console.log(error)
  });
});





//Consultas a la base de datos.
router.get('/User/login', function(req,res, next){
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', '*');
// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
 let userData = JSON.parse(req.query.user)
 console.log(userData)
   User.findAll({ where:{ usuario: userData.usuario , password: userData.password}})
    .then(resp => {
      let userResponse = JSON.stringify(resp)
        console.log(userResponse)
      if(userResponse){
        res.send({resp})
      }else{
        res.send({response: "no ok"})
       }
     })
    .catch(error =>{
      res.send(error)
    }
  ) 
 })

 router.get('/User/consulta', function(req, res, next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
    User.findById(1,{ attributes: ['usuario', 'password'] })
    .then(user => {
      console.log(user.dataValues)
      res.send({response: user.dataValues});
    })
    .catch(err => {
      console.log(err)
      res.send({error: err});
    })
  });

router.get('/User/log', function(req,res,next){
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', '*');
// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
  User.findAll({ attributes: ['usuario', 'password']})
  .then(resp => {
    res.send(resp)
  })
  .catch(err =>{
    res.send(err)
  })
})

router.get('/Producto/consulta', function(req,res, next){
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', '*');
// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
  Producto.findAll({ where:{ nombreProducto: "Arduino"}})
  .then(product => {
    res.send(product)
  })
  .catch(err =>{
    res.send(err)
  })
})

router.get('/User/logi', function(req,res,next){
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', '*');
// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
  User.findAll({})
  .then(user => {
    console.log(user)
    res.send({response: user});
  })
  .catch(err => {
    console.log(err)
    res.send({error: err});
  })
})

module.exports = router;
