import React from "react";
import RowCliente from "./RowCliente";
import CargarCliente from "./CargarCliente";
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
} from "reactstrap";

class ListaClientes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionado: {},
            cliente: {},
            clientes: [],
            usuario: {},
            usuarios: [],
            modal: false,
            username: "",
        };
        this.listadoClientes = this.listadoClientes.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.listadoClientes();
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    listadoClientes() {
        fetch(`http://localhost:8383/clientes`)
            .then((res) => res.json())
            .then((cltes) => this.setState({ clientes: cltes }))
            .catch(err => console.error("Error fetching clients:", err));
    }

    limpiarTabla() {
        this.setState({ username: "" });
        this.listadoClientes();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username } = this.state;
        const query = username ? `?busqueda=username=="${username}"` : '';
        this.listadoBusqueda(query);
    };

    listadoBusqueda(busqueda) {
        fetch(`http://localhost:8383/clientes${busqueda}`)
            .then((res) => res.json())
            .then((clts) => this.setState({ clientes: clts }))
            .catch(err => console.error("Error fetching clients:", err));
    }

    actualizarAlEliminar = (unCliente) => {
        this.setState((prevState) => ({
            clientes: prevState.clientes.filter(cliente => cliente.id_cliente !== unCliente.id_cliente),
        }));
    };

    seleccionar = (unCliente) => {
        this.setState({ cliente: unCliente });
        this.toggle();
    };

    renderRows() {
        const { clientes } = this.state;
        return clientes.map((cliente, index) => (
            <RowCliente
                key={index}
                cliente={cliente}
                seleccionar={this.seleccionar}
                actualizarAlEliminar={this.actualizarAlEliminar}
            />
        ));
    }

    render() {
        return (
            <div className="container">
                <Row>&nbsp;</Row>
                <Container fluid>
                    <Button color="success" onClick={this.toggle}>
                        Nuevo cliente
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            {this.state.cliente.id_cliente ? "Modificar Cliente" : "Nuevo Cliente"}
                        </ModalHeader>
                        <CargarCliente
                            cliente={this.state.cliente}
                            listadoClientes={this.listadoClientes}
                            toggle={this.toggle}
                        />
                    </Modal>
                    <Row>&nbsp;</Row>
                </Container>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Lista de Clientes
                                </CardHeader>
                                <CardHeader>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup row>
                                            <Col xs="12" md="9">
                                                <Input
                                                    type="text"
                                                    name="username"
                                                    placeholder="Buscar por username"
                                                    value={this.state.username}
                                                    onChange={(e) => this.setState({ username: e.target.value })}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <Button color="info" onClick={() => this.handleSubmit()}>
                                            Ver detalles de cliente
                                        </Button>
                                        <Button color="success" onClick={() => this.limpiarTabla()}>
                                            Ver todos los clientes
                                        </Button>
                                    </Form>
                                </CardHeader>
                                <CardBody>
                                    {this.state.clientes.length > 0 ? (
                                        <Table responsive bordered size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Dirección</th>
                                                    <th>Teléfono</th>
                                                    <th>UserName</th>
                                                    <th>Email</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.renderRows()}</tbody>
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
}

export default ListaClientes;
