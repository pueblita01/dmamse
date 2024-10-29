import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Card, CardBody, CardTitle, Container } from 'reactstrap';
import '../Css/ListaClientes.css';

class CargarCliente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cliente: props.cliente || {nombreCliente: '', razonSocial: '', cuilcuitC: '', email: '' },
      clientes: props.clientes || [],
      razonSocial: props.razonSocial || { razonSocial: '' },
      razonesSociales: props.razonesSociales || [],
      direcciones: props.direcciones || [],
      telefonos: props.telefonos || [],
      isEditing: props.isEditing || false,
    };
     this.estadoInicial = this.estadoInicial.bind(this);
  }
  estadoInicial() {
    console.log("estadoinicialdireccionestelfs", this.state.direcciones, this.state.telefonos)
    this.setState({
        cliente: {
            nombreCliente: '',
            razonSocial: '',
            cuilcuitC: '',
            email: ''
        },
        razonSocial: '',
        razonesSociales: [],
        direcciones: [] || [
            { calle: '', numero: '', manzana: '', departamento: '', ciudad: '', provincia: '', codigoPostal: '', pais: '', observaciones: '' }
        ],
        telefonos: [] || [
            { codigopais: '', caracteristica: '', numero: '', }
        ],
        isEditing: false,
    });
}
  componentDidMount() {
    this.props.listadoDirecciones();
    this.props.listadoTelefonos();
    this.props.listadoRazonesSociales();
    const { cliente, direcciones, telefonos, razonSocial,isEditing } = this.state;
    if (cliente && isEditing===true ) {
      this.setState({
        cliente: { razonSocial: razonSocial },
        direcciones: direcciones,
        telefonos: telefonos,
      });
    }
    else{
      if (!cliente && isEditing===false ) {
       this.estadoInicial()
      }
    }
  }

  handleClienteChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      cliente: {
        ...prevState.cliente,
        [name]: value
      }
    }));
  };
  handleRazonSocialChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      razonSocialCliente: {
        ...this.state.razonSocialCliente,
        [name]: value, 
      },
    });
  };
  handleDireccionChange = (event, index) => {
    const { name, value } = event.target;
    const newDirecciones = [...this.state.direcciones];
    newDirecciones[index][name] = value;
    this.setState({ direcciones: newDirecciones });
  };

  handleTelefonoChange = (event, index) => {
    const { name, value } = event.target;
    const newTelefonos = [...this.state.telefonos];
    newTelefonos[index][name] = value;
    this.setState({ telefonos: newTelefonos });
  };

  agregarDireccion = () => {
    const ultimaDireccion = this.state.direcciones[this.state.direcciones.length - 1];
    if (ultimaDireccion && (
      (ultimaDireccion.calle || '').trim() === '' ||
      (ultimaDireccion.numero === '' || ultimaDireccion.numero === null || ultimaDireccion.numero === undefined) ||
      (ultimaDireccion.ciudad || '').trim() === '' ||
      (ultimaDireccion.provincia || '').trim() === '' ||
      (ultimaDireccion.codigoPostal || '').trim() === '' ||
      (ultimaDireccion.pais || '').trim() === ''
    )) {
      alert('Por favor, complete todos los campos de la dirección actual antes de agregar una nueva.');
      return;
    }
    this.setState((prevState) => ({
      direcciones: [
        ...prevState.direcciones,
        { calle: '', numero: '',manzana: '',departamento: '',ciudad: '', provincia: '', codigoPostal: '', pais: '' ,observaciones: '', } 
      ]
    }));
  };


  agregarTelefono = () => {
    const ultimoTelefono = this.state.telefonos[this.state.telefonos.length - 1];
    if (ultimoTelefono && (
      (ultimoTelefono.codigopais || '').trim() === '' ||
      !ultimoTelefono.caracteristica ||
      !ultimoTelefono.numero
    )) {
      alert('Por favor, complete todos los campos del teléfono actual antes de agregar uno nuevo.');
      return;
    }
    this.setState((prevState) => ({
      telefonos: [
        ...prevState.telefonos,
        { codigopais: '', caracteristica: '', numero: '' }
      ]
    }));
  };


  eliminarDireccion = (index) => {
    const nuevasDirecciones = this.state.direcciones.filter((_, i) => i !== index);
    this.setState({ direcciones: nuevasDirecciones });
  };

  eliminarTelefono = (index) => {
    const nuevosTelefonos = this.state.telefonos.filter((_, i) => i !== index);
    this.setState({ telefonos: nuevosTelefonos });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submit', this.state.cliente)
    this.handleSaveCliente(this.state.cliente)
  }

  handleSaveCliente = (cliente) => {
    const {
      listadoClientes,
      listadoDirecciones,
      listadoTelefonos,
      listadoRazonesSociales,
    } = this.props; 
    const {
      direcciones,
      telefonos,
    } = this.state; 

    if (cliente.id) {
      fetch(`http://localhost:8383/cliente/${cliente.id}`, {
        method: "PUT", 
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...cliente,direcciones,telefonos}),
      })
        .then((response) => response.json())
        .then((data) => {
          listadoClientes();
          listadoDirecciones();
          listadoTelefonos();
          listadoRazonesSociales();
          this.estadoInicial();
          this.props.toggle()
        
        })
        .catch(err => console.error("Error updating client:", err));
    } else {
      fetch(`http://localhost:8383/nuevocliente`, {
        method: "POST", 
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...cliente,direcciones,telefonos}),
      })
        .then((response) => response.json())
        .then((data) => {
          listadoClientes(); 
          listadoDirecciones(); 
          listadoTelefonos(); 
          listadoRazonesSociales(); 
          this.estadoInicial();
          this.props.toggle()
       
        })
        .catch(err => console.error("Error creating client:", err));
    }
  };

  render() {
    const { cliente, direcciones, telefonos,isEditing } = this.state;
    console.log('renderCARGARrazonsocial',cliente.razonSocial)
    return (
      <Container className="mt-4">
        <Card className="shadow-sm">
          <CardBody>
            <CardTitle tag="h3" className="text-center mb-4">
              {isEditing && cliente.id ? 'Editar Cliente' : 'Nuevo Cliente'}
            </CardTitle>
            <Form onSubmit={this.handleSubmit}>
              <h5>Información del Cliente</h5>
              <FormGroup>
                <Label for="nombreCliente" className="todos-label">Nombre completo</Label>
                <Input
                  type="text"
                  name="nombreCliente"
                  id="nombreCliente"
                  value={cliente.nombreCliente}
                  onChange={this.handleClienteChange}
                  placeholder="Ingrese el nombre del cliente"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="razonSocial" className="todos-label" >Razón Social</Label>
                <Input
                  type="text"
                  name="razonSocial"
                  id="razonSocial"
                  value={cliente.razonSocial}
                  onChange={this.handleClienteChange}
                  placeholder="Ingrese la razón social"
                />
              </FormGroup>
              <FormGroup>
                <Label for="cuilcuitC" className="todos-label">CUIL/CUIT</Label>
                <Input
                  type="text"
                  name="cuilcuitC"
                  id="cuilcuitC"
                  value={cliente.cuilcuitC}
                  onChange={this.handleClienteChange}
                  placeholder="Ingrese el CUIL/CUIT"
                  maxLength="11"
                  required
                  className="cuilcuit-input"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email" className="todos-label">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={cliente.email}
                  onChange={this.handleClienteChange}
                  placeholder="Ingrese el email"
                  required
                />
              </FormGroup>
              <h5>Direcciones</h5>
              {direcciones && direcciones.length >=0  && direcciones.map((direccion, index) => (
                <div key={index} className="border p-2 mb-3">
                  <FormGroup>
                    <Label for={`calle-${index}`} className="todos-label">Calle</Label>
                    <Input
                      type="text"
                      name="calle"
                      id={`calle-${index}`}
                      value={direccion.calle}
                      onChange={(event) => this.handleDireccionChange(event, index)}
                      placeholder="Ingrese la calle"
                      required
                    />
                  </FormGroup>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for={`numero-${index}`} className="todos-label">Número</Label>
                        <Input
                          type="text"
                          name="numero"
                          id={`numero-${index}`}
                          value={direccion.numero}
                          onChange={(event) => this.handleDireccionChange(event, index)}
                          placeholder="Ingrese el número"
                          maxLength="7"
                          required
                          className="codigoPostalyNumero-input"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for={`codigoPostal-${index}`} className="todos-label">Código Postal</Label>
                        <Input
                          type="text"
                          name="codigoPostal"
                          id={`codigoPostal-${index}`}
                          value={direccion.codigoPostal}
                          onChange={(event) => this.handleDireccionChange(event, index)}
                          placeholder="Ingrese el código postal"
                          maxLength="7"
                          required
                          className="codigoPostalyNumero-input"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for={`ciudad-${index}`} className="todos-label">Ciudad</Label>
                    <Input
                      type="text"
                      name="ciudad"
                      id={`ciudad-${index}`}
                      value={direccion.ciudad}
                      onChange={(event) => this.handleDireccionChange(event, index)}
                      placeholder="Ingrese la ciudad"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for={`pais-${index}`} className="todos-label">País</Label>
                    <Input
                      type="text"
                      name="pais"
                      id={`pais-${index}`}
                      value={direccion.pais}
                      onChange={(event) => this.handleDireccionChange(event, index)}
                      placeholder="Ingrese el país"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for={`provincia-${index}`} className="todos-label">Provincia</Label>
                    <Input
                      type="text"
                      name="provincia"
                      id={`provincia-${index}`}
                      value={direccion.provincia}
                      onChange={(event) => this.handleDireccionChange(event, index)}
                      placeholder="Ingrese la provincia"
                      required
                    />
                  </FormGroup>
                  {direcciones.length > 0 && (
                    <Button className="boton-eliminar" onClick={() => this.eliminarDireccion(index)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  )}
                </div>
              ))}
              <div className="centrar-boton mt-4">
                <Button color="primary" onClick={this.agregarDireccion} className="boton-agregar">
                  + <i className="fas fa-map-marker-alt"></i>
                </Button>
              </div>
              <h5 className="mt-4">Teléfonos</h5>
              {telefonos && telefonos.length >=0  && telefonos.map((telefono, index) => (
                <div key={index} className="border p-3 mb-3">
                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label for={`codigopais-${index}`} className="todos-label" >Código País</Label>
                        <Input
                          type="text"
                          name="codigopais"
                          id={`codigopais-${index}`}
                          value={telefono.codigopais}
                          onChange={(event) => this.handleTelefonoChange(event, index)}
                          placeholder="Ingrese el código de país"
                          maxLength="5"
                          required
                          className="telefono-input"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for={`caracteristica-${index}`} className="todos-label">Característica</Label>
                        <Input
                          type="text"
                          name="caracteristica"
                          id={`caracteristica-${index}`}
                          value={telefono.caracteristica}
                          onChange={(event) => this.handleTelefonoChange(event, index)}
                          placeholder="Ingrese la característica"
                          maxLength="5"
                          required
                          className="telefono-input"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for={`numero-${index}`} className="todos-label">Número</Label>
                        <Input
                          type="text"
                          name="numero"
                          id={`numero-${index}`}
                          value={telefono.numero}
                          onChange={(event) => this.handleTelefonoChange(event, index)}
                          placeholder="Ingrese el número"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {telefonos.length > 0 && (
                    <Button className="boton-eliminar" onClick={() => this.eliminarTelefono(index)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  )}
                </div>
              ))}
              {/* <div className="d-flex justify-content-center mt-4"> */}
              <div className="centrar-boton mt-4">
                <Button color="primary" onClick={this.agregarTelefono} className="boton-agregar">
                  + <i className="fas fa-phone"></i>
                </Button>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Button type="submit" className="boton-guardar">
                  <i class="fas fa-save"></i> Guardar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }

}

export default CargarCliente;
