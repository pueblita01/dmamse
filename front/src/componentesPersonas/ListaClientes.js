import React from "react";
import RowCliente from "./RowCliente";
import CargarCliente from "./CargarCliente";
import "../Css/ListaClientes.css";
import {
    Table,
    Container,
    Row,
    Button,
    Modal,
    ModalHeader,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
    Alert,
} from "reactstrap";

class ListaClientes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cliente: { razonSocial: '', },
            clientes: [],
            direcciones: [] || [
                { calle: '', numero: '', manzana: '', departamento: '', ciudad: '', provincia: '', codigoPostal: '', pais: '', observaciones: '' }
            ],
            telefonos: [] || [
                { codigopais: '', caracteristica: '', numero: '', }
            ],
            razonSocial: '',
            razonesSociales: [],
            razonSocialCliente: null,
            usuario: {},
            usuarios: [],
            modal: false,
            username: "",
            searchQuery: '',
            error: '',
            isEditing: false,

        };
        this.listadoClientes = this.listadoClientes.bind(this);
        this.listadoDirecciones = this.listadoDirecciones.bind(this)
        this.listadoTelefonos = this.listadoTelefonos.bind(this)
        this.listadoRazonesSociales = this.listadoRazonesSociales.bind(this)
        this.estadoInicial = this.estadoInicial.bind(this)
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ modal: !this.state.modal, error: '' });
    }

    botonNuevoCliente() {
        this.toggle();
        this.estadoInicial()
    }
    componentDidMount() {
        this.listadoClientes();
        this.listadoDirecciones();
        this.listadoTelefonos();
        this.listadoRazonesSociales();
        this.setState({ isEditing: this.state.isEditing })
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
            direcciones: [
                { calle: '', numero: '', manzana: '', departamento: '', ciudad: '', provincia: '', codigoPostal: '', pais: '', observaciones: '' }
            ] || [],
            telefonos: [
                { codigopais: '', caracteristica: '', numero: '' }
            ] || [],
            isEditing: false,
        });
    }

    listadoClientes() {
        fetch(`http://localhost:8383/clientes`)
            .then((res) => res.json())
            .then((cltes) => this.setState({ clientes: cltes }))
            .catch(err => console.error("Error fetching clients:", err));
    }

    listadoDirecciones = () => {
        fetch(`http://localhost:8383/direcciones`)
            .then((res) => res.json())
            .then((dirs) => this.setState({ direcciones: dirs }))
            .catch(err => console.error("Error fetching direcciones:", err));
    }

    listadoTelefonos = () => {
        fetch(`http://localhost:8383/telefonos`)
            .then((res) => res.json())
            .then((tels) => this.setState({ telefonos: tels }))
            .catch(err => console.error("Error fetching telefonos:", err));
    }

    listadoRazonesSociales = () => {
        fetch(`http://localhost:8383/razonesSociales`)
            .then((res) => res.json())
            .then((rzs) => this.setState({ razonesSociales: rzs }))
            .catch(err => console.error("Error fetching razonesSociales:", err));
    }

    limpiarTabla() {
        this.setState({ searchQuery: "", error: "" });
        this.listadoClientes();
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { searchQuery, clientes } = this.state;

        const clienteEncontrado = clientes.find(cliente =>
            cliente.nombreCliente.toLowerCase() === searchQuery.toLowerCase()
        );

        if (clienteEncontrado) {
            this.setState({ cliente: clienteEncontrado, error: '' });
            this.toggle();
        } else {
            this.setState({ error: 'No se encontró el cliente.' });
        }
    };

    // var listaActualizada = this.state.clientes.filter(
    //     (cliente) => unCliente !== cliente
    // );
    // this.setState({ clientes: listaActualizada, cliente: {} });
    actualizarAlEliminar = (unCliente) => {
        console.log('uncliente', unCliente)
        this.setState((prevState) => ({
            clientes: prevState.clientes.filter(cliente => cliente.id !== unCliente.id),
        }));
    };
    seleccionar = (unCliente) => {
        this.setState({ cliente: unCliente });
    };

    handleEditClick = (unCliente, razonSocial, direccionesCliente, telefonosCliente) => {
        console.log("HANDLEEDITCLIENTE/seleccionar", unCliente.razonSocial, razonSocial)
        this.setState({
            cliente: { ...unCliente, razonSocial: razonSocial },
            razonSocial: razonSocial,
            direcciones: direccionesCliente,
            telefonos: telefonosCliente,
            isEditing: true,
        });
        this.toggle();
    };

    render() {

        const { cliente, clientes, direcciones, telefonos, razonSocial, razonesSociales, isEditing, searchQuery, error } = this.state;
        console.log('renderListacliente', cliente, direcciones, telefonos, isEditing)
        // Filtrando clientes basado en la búsqueda
        // const filteredClientes = clientes.filter(cliente =>
        //     cliente.nombreCliente.toLowerCase().includes(searchQuery.toLowerCase())
        // );

        return (
            <div className="container-form">
                <Row>&nbsp;</Row>
                <Container fluid>
                    {/* <div className="header-fixed"> */}
                    <Row className="header-fixed">
                        <Col xs="auto">
                            <Button color="success" className="boton-agregar" onClick={() => this.botonNuevoCliente()}>
                                Nuevo cliente
                            </Button>
                        </Col>
                        <Col xs="auto" className="ms-auto">
                            <Form onSubmit={this.handleSubmit} className="d-flex align-items-center">
                                <FormGroup className="mb-0 me-2">
                                    <Input
                                        type="text"
                                        name="search"
                                        placeholder="Buscar por nombre de cliente"
                                        value={searchQuery}
                                        onChange={this.handleSearchChange}
                                        className="buscador-cliente"
                                    />
                                </FormGroup>
                                <FormGroup className="mb-0 me-2">
                                    <Button className="btn-detalle" type="submit">
                                        <i className="fas fa-search"></i>
                                    </Button>
                                    <Button className="btn-ver-lista" onClick={() => this.limpiarTabla()}>
                                        <i className="fas fa-list"></i>
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    {/* </div> */}
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader>
                            {isEditing === true ? "Modificar Cliente" : "Nuevo Cliente"}
                        </ModalHeader>
                        <React.Fragment>
                            {/* {isEditing === false && ( */}
                            <CargarCliente
                                cliente={cliente}
                                clientes={clientes}
                                razonesSociales={razonesSociales}
                                razonSocial={razonSocial}
                                direcciones={this.state.direcciones}
                                telefonos={telefonos}
                                listadoClientes={this.listadoClientes}
                                listadoDirecciones={this.listadoDirecciones}
                                listadoTelefonos={this.listadoTelefonos}
                                listadoRazonesSociales={this.listadoRazonesSociales}
                                estadoInicial={this.estadoInicial}
                                toggle={this.toggle}
                            />
                            {/* )} */}
                        </React.Fragment>
                        {/* <React.Fragment> */}
                        {/* {isEditing === true && cliente !== undefined && ( */}

                    </Modal>
                    <Row>&nbsp;</Row>
                </Container>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <i className="fa fa-align-justify"></i> Lista de Clientes
                                    </div>
                                    <div>
                                        <Button className="me-2" color="primary"> <i className="fa fa-file-export me-2"></i> </Button>
                                        <Button className="me-2" color="secondary"><i className="fa fa-file-import me-2"></i> </Button>
                                        <Button className="me-2" color="secondary"><i className="fa fa-save me-2"></i>  </Button>
                                        <Button color="success">C</Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="cardbodylistaclientes-custom">
                                    {clientes.length > 0 ? (
                                        <Table className="table-custom">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Direccion</th>
                                                    <th scope="col">Telefono</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Razon Social</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderRowCliente(clientes, direcciones, telefonos, razonesSociales)}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <p>No hay clientes disponibles</p>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    renderRowCliente(clientes, direcciones, telefonos, razonesSociales) {
        return !clientes
            ? console.log("No hay clientes para mostrar", null)
            : clientes.map((unCliente, index) => {
                let razonSocialCliente = razonesSociales.find((unaRzs) => unaRzs.id === unCliente.razonSocialCId)
                console.log('direccionesrenderRowcliente', unCliente.RazonSocialC.razonSocial
                )
                // if (clientes) {
                //     return clientes.map((unCliente, index) => {
                return (
                    <RowCliente
                        key={index}
                        cliente={unCliente}
                        clientes={clientes}
                        direcciones={direcciones}
                        telefonos={telefonos}
                        razonesSociales={razonesSociales}
                        razonSocial={razonSocialCliente != null ? razonSocialCliente.razonSocial : 'SIN RAZON SOCIAL'}
                        id_cliente={unCliente.id}
                        id_razonSocial={unCliente.razonSocialCId}
                        seleccionar={this.seleccionar}
                        actualizarAlEliminar={this.actualizarAlEliminar}
                        handleEditClick={this.handleEditClick}
                    // obtenerDireccionesDeCliente={this.obtenerDireccionesDeCliente}
                    />
                );
            });
    }
}

export default ListaClientes;
