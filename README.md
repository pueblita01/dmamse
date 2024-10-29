# dmamse
 orden migracion 
 1 usuario 20240612234420-create-usuario.js
 2 rol
 3 permiso
 4 modulo
 5 usuarios_roles
 6 rol_permiso
 7 permiso_modulo
 8 direccion
 9 telefono
 10 razonsocial
 11 tipoiva
 12 tipodni
 13 tipopago
 14 admin
 15 cliente
 16 proveedor
 17 subfamilia
 18 familia
 19 categoria
 20 producto
 21 producto_proveedor
 22 tipofactura
 23 factura
 24 detalleventa
 25 venta
 26 detallecompra
 27 compra
 28 pago
 29 remito
 30 inventario 
 31 caja
 32 movbancarios
 33 reserva
 34 cierre
 35 cheque



1. Gestión de inventario:
   Registro de productos, control de stock, etc.
2. Compras y ventas:
   Registro de compra a proveedores, registro de ventas a clientes
3. Códigos de barra:
   Integrar la máquina para las entradas y salidas
4. Informe y análisis:
   Reporte de ventas, productos más vendidos, análisis de inventario
5. Control de caja:
   Manejo del efectivo, diferentes métodos de pago y registros de caja.
   //Los detalles de venta son como los Items
   // TIPOCLIENTE EMPRESA,INDIVIDUAL
  // idUsuario: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },

 
  fecha: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('fecha')).format('DD/MM/YYYY');
        }
      },
      hora: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('hora')).format('HH:mm');
        }
Ref usuarios_roles: U.idUsuario<> R.idRol // many-to-many
Ref: U.idUsuario < AU.usuarioIdAU // one to many
Ref rol_permiso: R.idRol<> P.idPermiso // many-to-many
Ref permiso_modulo: P.idPermiso<> M.idModulo// many-to-many
Ref: PV.usuarioPId - U.idUsuario// one to one
Ref: PV.tipoIvaIdPv - TI.idTipoIva // one to one
Ref: PV.tipoDniP - DNI.idTipoDni // one to one
Ref: PV.direccion_Id < D.idDireccion // one to many
//Ref: PV.idProveedor < CH.proveedorIdCh // one to many
Ref: PV.telefono_Id < T.idTelefono // one to many
Ref: A.usuarioAId - U.idUsuario // one to one
Ref: C.usuarioCId - U.idUsuario//+ one to one
Ref: C.tipoIvaId - TI.idTipoIva // one to one
Ref: C.tipoDniId - DNI.idTipoDni // one to one
Ref: C.direccion_Id < D.idDireccion // one to many
Ref: C.telefono_Id < T.idTelefono // +one to many
Ref: PD.familiaId < Flia.idFamilia // one to many
Ref: PD.categoriaId < CT.idCategoria // one to many
Ref producto_proveedor: PD.idProducto <> PV.idProveedor //many to one
Ref: Flia.subfamiliaid < SFlia.idSubfamilia // +one to many
Ref: VT.clienteIdVta > C.idCliente // many to one
Ref: VT.idVenta > CJ.ventaCajaId // many to one
Ref: VT.idVenta > PGS.ventaPagoId
Ref: CP.proveedorCompraId < PV.idProveedor
Ref: CP.idCompras > CJ.compraCajaId
Ref: CP.idCompras < PGS.compraPagoId
Ref: F.ventaIdF < VT.idVenta // one to many
Ref: F.compraIdF - CP.idCompras // one to many
Ref: CJ.idCaja < CP.idCompras //+one to many
Ref: CJ.idCaja < F.cajaIdF // +one to many
Ref: CJ.idCaja < MB.cajaIdMB //+ one to many
Ref: RS.clienteReservaId > C.idCliente
Ref: RS.proveedorReservaId > PV.idProveedor
Ref: PGS.chequePagoId - CH.idCheque // one to one
//Ref: "DM"."clientes"."email" < "DM"."clientes"."telefono_Id"
***************************************************************************************************
/ o llevar el user_id a cada Cliente/proveedor
 Table DM.usuarios as U {
  idUsuario integer [pk, increment, not null]    
  nombreEmpresa char [null]
  username varchar(50) [unique, not null]
  email char [unique, not null]
  password varchar(255) [not null]
  registrado bool [null]
  fechaDeRegistro timestamp [not null, default:`now()`]
 }
//Si es rol_id 1 es Admin,si es 2 es
//cliente y asi..
// En vez de hacerlo desde el usuario,como en catenacio
// lo hago desde esta tabla roles
Table DM.roles as R{
   idRol integer [pk, increment, not null]
   tipoRol char 
}
Table DM.usuarios_roles as UR {
  idUsuarioRol integer [pk, increment, not null]
  usuarioRId integer
  rolUId integer
}
//permisos de leer,escribir,etc
Table DM.permisos as P {
  idPermiso integer [pk, increment, not null]
  permisoOperacion char 
}
//Hacer despues tiene tabla intermedia uno a muchos
Table DM.rol_permiso {
  //rol_permiso_id integer [pk, increment, not null]
  rol_p_id integer [ref:> DM.roles.idRol]
  permiso_r_id integer [ref:> DM.permisos.idPermiso]
}
Table DM.permiso_modulo{
  idPermisoModulo int [pk, increment, not null]
  permiso_m_id int [ref:> P.idPermiso]
  modulo_p_id int [ref:> M.idModulo]
}
Table DM.modulos as M{
  idModulo integer [pk, increment,not null]
  nombre char 
}
Table DM.admins as A {
  idAdmin integer [pk, increment,not null]
  usuarioAId integer
  nivelAcceso char//admin,contadora,empleada,dev,etc
}
Table DM.clientes as C {
    idCliente integer [pk, increment, not null]
    usuarioCId integer //one to one
    tipoIvaId integer [null]
    tipoDniId integer [null]
    direccion_Id integer [null]
    telefono_Id integer [null]
    nombre char [null]
    email char [unique, null]
    cumpleaños date
    tipoCliente char
}
Table DM.proveedores as PV{
    idProveedor integer [pk, increment, not null]
    usuarioPId integer
    tipoIvaIdPv integer [null]
    tipoDniP integer [null]
    direccion_Id integer [null]
    telefono_Id integer [null]
    nombreEmpresa char [null]
    contacto char [null]
    telefono int
    email char [unique, null]
    notas varchar[255]
}
Table DM.tipoIva as TI {
  idTipoIva integer [pk, increment, not null]
   tipoIva string
}
Table DM.tiposDni as DNI {
  idTipoDni integer [pk, increment, not null]
  tipoDni string
  nroDni integer [unique]
}
Table DM.direcciones as D {
  idDireccion integer [pk, increment, not null]
  calle integer
  altura integer
  codigoPostal char
  manzana integer
  departamento char
  ciudad char
  provincia char
  pais char
}

Table DM.telefonos as T {
  idTelefono integer [pk, increment, not null]
  caracteristica integer
  numero integer
  codigopais int
}

Table DM.productos as PD {
  idProducto integer [pk, increment, not null]
    simboloProducto integer
    codigoBarra integer
    familiaId integer
    proveedorId integer
    categoriaId integer
    nombre string
    descripcion string
    unidadMedida string
    presentacion string
    precioCosto decimal(10,2)
    precioUnidad decimal(10,2)
    precioActual decimal(10,2)
    precioSugerido decimal(10,2)
    stockActual integer
    stockMinimo integer
    fechaCreacion date
    ultimaActualizacion date
    suelto boolean
}
Table DM.familias as Flia {
  idFamilia integer [pk, increment, not null]
  nombreFamilia char
  subfamiliaid integer // one to one
}
Table DM.subfamilias as SFlia {
  idSubfamilia integer [pk, increment, not null]
  nombreSubfamilia char
}
Table DM.categorias as CT {
  idCategoria integer [pk, increment, not null]
  marca char
  categoria char     
}
Table producto_proveedor as PRDPRV{
 id integer [pk, increment, not null]
 proveedorprodId integer
 productoprovId integer
}
//me quede aca
Table DM.ventas as VT {
 idVenta integer [pk, increment, not null]  
    productoIdVta integer
    clienteIdVta integer
    fechaVta date
    totalVta decimal(10,2)
    utilidad string
    }
    
Table DM.detallesVta as DVT {
 idDetallesVta integer [pk, increment, not null]
    ventaId integer
    productoIdVta integer
    cantidad integer
    precioUnitario decimal(10,2) [not null]
}
Table DM.pagos as PGS{
  idPago integer [pk, increment, not null]
  tipoPagoId integer
  compraPagoId integer
  ventaPagoId integer
  chequePagoId integer
  montoPago decimal(10,2)
  fechaPago date
  detallePago string
} 
Table DM.tiposPago as TP{
  idTipoPago integer [pk, increment, not null]
  tipoPago char 
}
Table DM.caja as CJ {
  idCaja integer [pk, increment, not null]
  ventaCajaId integer
  compraCajaId integer
  fechaCaja date
  montoInicial decimal(10,2)
  montoFinal decimal(10,2)
  tipoCaja string //mensual,anual,diaria
  detallesCaja string
}
Table DM.Facturas as F {
  idFactura integer [pk, increment, not null]
  ventaIdF integer
  compraIdF integer
  cajaIdF integer
  tipoPagoIdF integer
  tipoFacturaId integer
  numeroFactura integer
  fechaFactura date 
  totalFactura decimal(10,2)
}
//fiscal o no fiscal
Table DM.tiposFactura as TF{
  idTipoFactura integer [pk, increment, not null]
  tipoFactura char 
}
Table DM.compras as CP {
  idCompras integer [pk, increment, not null]
  fechaCompra date
  proveedorCompraId integer
  totalCompra integer
  tipoPagoIdCompra integer
}
Table DM.detallescompras as DC {
  idDetalleCompra integer [pk, increment, not null]
  compraId integer
  productoIdDC integer
  cantidad integer
  precioUnitario decimal(10,2)
}
Table DM.remitos as RT{
  idRemito integer [pk, increment, not null]
  fechaRemito date
  ventaRemitoId integer
}

Table DM.movimientosBancarios as MB {
idMovBanc integer [pk, increment, not null]
cajaIdMB integer
fechaMB date
descripcionMB string
montoMB decimal (10,2)
tipoDeMovimiento string //ingreso,egreso
}
Table DM.reservas as RS{
idReserva integer [pk, increment, not null]
clienteReservaId integer
proveedorReservaId integer 
fechaInicio date
fechaFin date
descripcionReserva string
estado string // activada,cancelada,completada
}
//cierres
Table DM.auditorias as AU {
  idauditoria integer [pk, increment, not null]
  usuarioIdAU integer
  fechaAU date
  tipoAuditoria string // consumoInterno,ingresoMercaderia ,etc
}
Table Cheques as CH {
  idCheque integer [pk, increment, not null]
  proveedorIdCh integer
  numeroCheque integer
  fechaEmision date
  fechaCobro date
  montoCheque decimal(10.2)
}


***************************************************************************************************
Producto:
id
codigo del producto
nombre del producto
categoria
descripcion
precioUnitario
cantidad en stock(en la tabla stock/inventario)
fecha de ultima actualizacion(tabla stock/inventario )
suelto

PROVEEDOR
idproveedor
nombreEmpresa
nombreContacto
correo electronico
fk direccion
detalle

PLANILLA COMPRA/VENTA (separadas)
fecha
codigo del producto
nombre del producto
cantidad vendida o cantidad comprada (segun corresponda)
proveedor (en compras)
clientes (en ventas)
precio unitario
fk proveedor foreingkey
total
observaciones

FACTURA
id(numero)
REMITO
id(numero)

REGISTRO DE COMPRAS A PROVEEDORES
fecha
fk proveedor (id)
nombre del proveedor
concepto
nro factura/remito (FK DEL PROVEEDOR)
importeneto
iva
IIBB
otros impuestos
total
observaciones
estado("NULL,PAGA,A CUENTA")
\*NOTA:en esta parte, estaría bueno encontrar la manera de que, por ejemplo, llega la compra, la tía registra la factura o remito y, que al mismo tiempolos productos que se carguen por esta compra y se actualice el inventario.

PARTE2 INVENTARIO PRACTICA !!Revisar
Nombre del producto
Precio Costo
Precio Costo Unit
Unidad
Presentación ej:bulto
Margen Ganancia
Precio Venta
Unidad
Utilidad
GRANIX ?'
iva 21 %
iibb 1,50 %

GESTION DE INVENTARIO
STOCK (por otro lado, se puede asociar con la cant.vend- o comprada + para descontar)

Después esta planilla la perfeccionamos para que
se asocie a la caja de efectivo, bancos y mercado pago.
Y de ahí, hace una caja diaria.
INVENTARIO
Código
Nombre del producto
Categoría
Compras
Ventas
Stock
Costo Unitario
Precio Venta
Utilidad por producto
Valor del inventario
TotalInventario

COMPRAS
Código Fecha Mes Año Nombre del producto Categoría Costo Unitario Cantidad Total
VENTAS
$ 18.700,00 $ 11.075,63
Código Fecha Mes Año Nombre del producto Proveedor Precio de venta Costo Unitario Cantidad Total Venta(TOTAL VENTA)
Utilidad (TOTAL UTILIDAD)

VER PROVEEDORES
IVA IIBB
Código Nombre del producto Precio Costo Precio Costo Unit Unidad Presentación Margen Ganancia Precio Venta Unidad Utilidad GRANIX 21 % 1,50 %

FRONT
listado de productos
producto
nombre del producto
categoria(Granix,tododieta,pan) armar un selector





-----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
------------------------------------FRONTEND-----------------------------------------------
-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------
*COMO NO SE PODIA INSTALAR BOOTSTRAP HICE LO SIGUIENTE:
1-EN LA TERMINAL
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc

nvm install 18

nvm use 18

node --version

.....
borre e instale otra vez-> 
 npx react-create-app front
npm install bootstrap react-bootstrap


Entendido, aquí tienes un ejemplo de cómo crear un formulario de inicio de sesión (login) utilizando Bootstrap en una aplicación de React. También incluiré un Navbar y un Sidebar básico para complementar el diseño.Pasos para implementar un formulario de login con Bootstrap en ReactCrear una nueva aplicación de React (si aún no lo has hecho):npx create-react-app my-app
cd my-appInstalar Bootstrap y React-Bootstrap:npm install bootstrap react-bootstrapImportar Bootstrap en tu proyecto:Abre src/index.js y añade la línea para importar Bootstrap CSS:import 'bootstrap/dist/css/bootstrap.min.css';
Crear componentes para el Navbar, Sidebar y Login:NavbarComponent.js:

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarComponent;


SidebarComponent.js:

import React from 'react';
import { Nav } from 'react-bootstrap';

const SidebarComponent = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light p-3">
      <Nav className="flex-column">
        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
        <Nav.Link href="#profile">Profile</Nav.Link>
        <Nav.Link href="#settings">Settings</Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarComponent;



LoginComponent.js:

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el proceso de inicio de sesión
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mt-5">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;



Actualizar el componente App.js para incluir el Navbar, Sidebar y Login:App.js:


import React from 'react';
import NavbarComponent from './NavbarComponent';
import SidebarComponent from './SidebarComponent';
import LoginComponent from './LoginComponent';
import './App.css';  // Asegúrate de tener algún CSS para el layout

const App = () => {
  return (
    <div className="d-flex">
      <SidebarComponent />
      <div className="flex-grow-1">
        <NavbarComponent />
        <div className="container mt-4">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default App;



Asegúrate de tener un CSS básico para el layout en src/App.css:App.css:

.d-flex {
  display: flex;
}
.flex-grow-1 {
  flex-grow: 1;
}
.vh-100 {
  height: 100vh;
}



Con estos pasos, deberías tener un proyecto de React con un Navbar, Sidebar y un formulario de inicio de sesión (login) utilizando Bootstrap. Puedes personalizar más los componentes y el CSS según tus necesidades.




INSOMNIA: 
POST CLIENTE PRUEBA (CON DIRECCION)
router.post("/cliente/nuevo/:razonSocial/:tipoDNI/:nroDNI", controllerCliente.create);
 POST http://localhost:8383/cliente/nuevo/ACME/Documentos/12345675
{
  "nombreCliente": "Michael Brown",
  "cuilcuitC": "2056789012",
  "email": "michaelbrown@example.com",
  "cumpleaños": "1988-07-30",
  "tipoCliente": "CFinal",
  "direccion": {
    "calle": "Sunset Blvd.",
    "altura": 321,
    "codigoPostal": "45678",
    "manzana": "E",
    "departamento": "4D",
    "ciudad": "Hollywood",
    "provincia": "California",
    "pais": "USA"
  }
}
