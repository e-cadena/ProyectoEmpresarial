const Sequelize = require('sequelize');


//modelos de tablas
//Tabla Usuario
const User = sequelize.define('Usuario', {
  usuario: {
    type: Sequelize.STRING
  },
  contraseña: {
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

// tabla ProductorxProveedor
const PruductosxProveedor = sequelize.define('Proveedores', {
    proveedor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: Proveedor,
          key: "id"
        },
        associate: function(modelos){
          modelos.PruductosxProveedor.hasMany(modelos.Proveedor)
        }
      },
      producto_id: {
        type: Sequelize.INTEGER,
        references: {
          model: Producto,
          key: "id"
        },
        associate: function(modelos){
          modelos.PruductosxProveedor.hasMany(modelos.Producto)
        }
      }
  });
  

// tabla Facturas
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
  },
  tipo_id: {
    type: Sequelize.INTEGER,
    references: {
      model: detalleFactura,
      key: "id"
    },
    associate: function(modelos){
      modelos.Factura.hasMany(modelos.detalleFactura)
    }
  }
});

// tabla detalleFacturas
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
  detalle_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Producto,
      key: "id"
    },
    associate: function(modelos){
      modelos.detalleFactura.hasMany(modelos.Producto)
    }
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

// tabla tipoProductos
const tipoProducto = sequelize.define('tipoProductos', {
    nombreProducto: {
      type: Sequelize.STRING
    }
  });


// force: true will drop the table if it already exists Usuario
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    usuario: 'John',
    contraseña: 'john1234',
  });
});

// force: true will drop the table if it already exists Plataformas
Plataforma.sync({force: true}).then(() => {
  // Table created
  return Plataforma.create({
    placa: 'Arduino',
    version: 'Leonardo'
  });
});

// force: true will drop the table if it already exists Productos
Producto.sync({force: true}).then(() => {
  // Table created
  return Producto.create({
    nombreProducto: 'Sensor',
    precioUnitario: '5.00'
  });
});



// force: true will drop the table if it already exists Proveedores
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

PruductosxProveedor.sync({force: true}).then(() => {
    // Table created
    return PruductosxProveedor.create({
    
    });
  });

// force: true will drop the table if it already exists tipoProductos
tipoProducto.sync({force: true}).then(() => {
  // Table created
  return tipoProducto.create({
    nombreProducto: 'Arduino'
   
  });
});


// force: true will drop the table if it already exists Facturas
Factura.sync({force: true}).then(() => {
  // Table created
  return Factura.create({
    numeroFactura: '001',
    iva: '12',
    total:'35.00',
    subTotal: '32.00'
  });
});

// force: true will drop the table if it already exists
detalleFactura.sync({force: true}).then(() => {
  // Table created
  return detalleFactura.create({
    precio: '8.00',
    cantidad: '4',
    valorTotal:'32.00'
  });
});

/********* */

