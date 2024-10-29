'use strict';
require("dotenv").config();
const timezone = 'America/Argentina/Buenos_Aires';
require('moment').tz.setDefault(timezone);

const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: "false",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    tableOptions: {
      ENGINE: 'innodb',
    },
    timezone: timezone
  });

// Importar todos los modelos
// const modelsPath = path.join(__dirname, 'models');
const models = require('./models'); // Importar desde models/index.js

// Definir los modelos en el orden adecuado
sequelize.models = {
  //   Empleado: require("./models/empleado")(sequelize, Sequelize.DataTypes),
  //   Usuario: require("./models/usuario")(sequelize, Sequelize.DataTypes),
  //   RazonSocial: require("./models/razonsocial")(sequelize, Sequelize.DataTypes),
  //   TipoDni: require("./models/tipodni")(sequelize, Sequelize.DataTypes),
    // Direccion: require("./models/direccion")(sequelize, Sequelize.DataTypes),
  //   Telefono: require("./models/telefono")(sequelize, Sequelize.DataTypes),
  //   Cliente: require("./models/cliente")(sequelize, Sequelize.DataTypes),
  //   Reserva: require("./models/reserva")(sequelize, Sequelize.DataTypes),
  //   Modulo: require("./models/modulo")(sequelize, Sequelize.DataTypes),
  //   Permisos_modulos: require("./models/permisos_modulos")(sequelize, Sequelize.DataTypes),
  //   Rol_permisos: require("./models/rol_permisos")(sequelize, Sequelize.DataTypes),
  //   Permiso: require("./models/permiso")(sequelize, Sequelize.DataTypes),
  //   Rol: require("./models/rol")(sequelize, Sequelize.DataTypes),
  //   Usuarios_roles: require("./models/usuarios_roles")(sequelize, Sequelize.DataTypes),
  //   Remito: require("./models/remito")(sequelize, Sequelize.DataTypes),
  //   TiposFactura: require("./models/tipofactura")(sequelize, Sequelize.DataTypes),
  //   TiposIva: require("./models/tipoiva")(sequelize, Sequelize.DataTypes),
  //   Inventario: require("./models/inventario")(sequelize, Sequelize.DataTypes),
  //   Factura: require("./models/factura")(sequelize, Sequelize.DataTypes),
  //   DetallesCompra: require("./models/detallescompra")(sequelize, Sequelize.DataTypes),
  //   Compra: require("./models/compra")(sequelize, Sequelize.DataTypes),
  //   DetallesVenta: require("./models/detallesventa")(sequelize, Sequelize.DataTypes),
  //   Venta: require("./models/venta")(sequelize, Sequelize.DataTypes),
  //   TiposPago: require("./models/tipopago")(sequelize, Sequelize.DataTypes),
  //   Pagos: require("./models/pago")(sequelize, Sequelize.DataTypes),
  //   Caja: require("./models/caja")(sequelize, Sequelize.DataTypes),
  //   Subfamilia: require("./models/subfamilia")(sequelize, Sequelize.DataTypes),
  //   Familia: require("./models/familia")(sequelize, Sequelize.DataTypes),
  //   Cierre: require("./models/cierre")(sequelize, Sequelize.DataTypes),
  //   Cheque: require("./models/cheque")(sequelize, Sequelize.DataTypes),
  //   Admin: require("./models/admin")(sequelize, Sequelize.DataTypes),
  //   Proveedor: require("./models/proveedor")(sequelize, Sequelize.DataTypes),
    // Productos: require("./models/producto")(sequelize, Sequelize.DataTypes),
  //   Producto_Proveedor: require("./models/producto_proveedor")(sequelize, Sequelize.DataTypes),
  //   MovimientosBancario: require("./models/movimientosbancario")(sequelize, Sequelize.DataTypes),
};


sequelize.authenticate()
  .then(() => {
    console.log('Base de datos conectada exitosamente!');
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err);
  });

//  sequelize.sync()
//  si solo se agregan atributos probar aca
   sequelize.sync({alter:true}) 

  // !para migrar hacer primero descomentar arriba el modelo, luego force true y 
  // despues force false luego se sincroniza normal
  //  sequelize.sync({force:true})  
  // sequelize.sync({force:false})           

  .then(() => {
    console.log(`Base de datos y tablas creadas, modelos sincronizados!`);
  });

module.exports = {
  models,
  sequelize,
};
