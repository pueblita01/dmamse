import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import VentasListaRow from "./VentasListaRow";
import CargarVenta from "./CargarVenta";
import {
    Table,
    Row,
    Button,
    ModalHeader,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
} from "reactstrap";
import CardColumns from "reactstrap/lib/CardColumns";
registerLocale('es', es)
var moment = require('moment');
class VentasLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionado: {},
            venta: {},
            ventas: [],
            items: [],
            item: {},
            ventasACliente: [],
            pagosDeCliente: [],
            modal: false,
            editable: false,
            id: "",
            startDate: new Date()
        };
        this.seleccionar = this.seleccionar.bind(this)
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    componentWillMount() {
        // this.Pedidos();
        this.listadoProductos();
        // this.listadoItemsPedidoVentas();
    }

    verDetallesDePedidoVenta(id) {
        var listaActualizada = this.state.ventas.filter(
            (venta) => id === venta.id
        );
        this.setState({ ventas: listaActualizada });
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };


    listadoBusqueda = (busqueda) => {
        if (busqueda != null) {
            fetch(`http://localhost:8383/ventas` + busqueda)
                .then((res) => res.json())
                .then((pddos) => this.setState({ ventas: pddos }));
        }
        if (busqueda == null) {
            fetch(`http://localhost:8383/ventas`)
                .then((res) => res.json())
                .then((pddos) => this.setState({ ventas: pddos }));
        }
    };
    listadoPedidosVentas = () => {
        fetch("http://localhost:8383/ventas")
            .then((res) => res.json())
            .then((res) => this.setState({ ventas: res, venta: {} }),

        );
    };
    listadoProductos = () => {
        fetch(`http://localhost:8383/productos`)
            .then((res) => res.json())
            .then((pds) =>
                this.setState({
                    productos: pds,
                    producto: {},
                })
            );
    };

    Ventas = () => {
        fetch(`http://localhost:8383/itemsTodos`)
            .then((res) => res.json())
            .then((its) =>
                this.setState({
                    items: its,
                    item: {},
                })
            );
    };


    limpiarTabla = () => {
        document.getElementById("id").value = "";
        this.Pedidos();
    };

    handleSubmit = (e) => {
        var busqueda;
        if (this.state.id === "") {
            this.listadoBusqueda(busqueda);
        }
        if (this.state.id !== "") {
            busqueda = '?busqueda=id=="' + this.state.id + '"';
            this.listadoBusqueda(busqueda);
        }
        e.preventDefault(e);
    };

    actualizarAlEliminar = (unaVenta) => {
        var listaActualizada = this.state.ventas.filter(
            (venta) => unaVenta !== venta
        );
        this.setState({ ventas: listaActualizada, venta: {} });
    };

    eliminarPedido(id) {
        this.props.eliminarPedido(id);
    }

    seleccionar = (unaVenta) => {
        this.setState({ venta: unaVenta });
    };


    ModalHeaderStrong = (editable) => {
        if (editable) {
            return (
                <ModalHeader editable={false} toggle={this.toggle}>
                    <strong>Nuevo</strong>Pedido
                </ModalHeader>
            );
        }
        return (
            <ModalHeader editable={true} toggle={this.toggle}>
                <strong>Modificar</strong>Pedido
            </ModalHeader>
        );
    };

    setStartDate(startDate) {
        this.setState({ startDate })
    }

    render(props) {
        if (this.state.ventas.length > 0) {
            var listaIdsPedidos = this.state.ventas.map((venta) => {
                return (
                    <div>
                        <option value={venta.id} />
                    </div>
                );
            });
            // console.log("listaIdsPedidos", this.state.venta);

            return (
                <div className="container">
                    <div></div>
                    <Row>&nbsp;</Row>
                    {/* <Container fluid>
                        <Button color="success" onClick={this.toggle}>
                            Nuevo venta
                        </Button>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <this.ModalHeaderStrong></this.ModalHeaderStrong>
                            <CargarPedido
                                venta={this.state.venta}
                                ventas={this.state.ventas}
                                Pedidos={this.Pedidos}
                                listadoProductos={this.listadoProductos}
                                Ventas={this.Ventas}
                                seleccionar={this.seleccionar}
                            />
                        </Modal>
                        <Row>&nbsp;</Row>
                    </Container> */}
                    <div className="animated fadeIn">
                        {/* {Boolean(
            this.state.ventas.length ? */}
                        <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                    <CardHeader style={{ backgroundColor: "#0972F9" }}>
                                        <i className="fa fa-align-justify"></i> Pedidos Lista

                                    </CardHeader>
                                    <CardHeader style={{ backgroundColor: "#7E98BB" }}>


                                        <Form onSubmit={this.handleSubmit} id="formulario">
                                            <Row>
                                                <CardColumns>
                                                    <DatePicker
                                                        className="border rounded ml-1 shadow-lg p-2 mb-1 rounded" key="data-pickers"
                                                        selected={this.state.startDate}
                                                        // onSelect={props.handleDateSelect}
                                                        onChange={(date) => this.setStartDate(date)}
                                                        locale="es"
                                                        dateFormat="dd/MM/yyyy"
                                                        // timeInputLabel="Hora:"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        yearDropdownItemNumber={15}
                                                    // showTimeInput
                                                    // highlightDates={highlightWithRanges}

                                                    />
                                                    <FormGroup row>
                                                        <Col xs="12" md="9">
                                                            <Input
                                                                className="border rounded ml-1 shadow-lg p-3 mb-1 rounded"
                                                                type="number"
                                                                id="id"
                                                                name="id"
                                                                placeholder="Elegir id"
                                                                onChange={this.handleChange}
                                                                list="venta"
                                                            />
                                                        </Col>
                                                        <datalist id="venta">{listaIdsPedidos}</datalist>
                                                    </FormGroup>
                                                </CardColumns>
                                            </Row>
                                            {/* <div className="row"> */}
                                            <div className="input-field col s12 m12">
                                                <Button
                                                    type="button"
                                                    style={{ margin: "2px" }}
                                                    color="info"
                                                    outline
                                                    onClick={() =>
                                                        this.verDetallesDePedidoVenta(this.state.id)
                                                    }
                                                >
                                                    <i className="fa fa-dot-circle-o"></i>Ver detalles
                                                    de venta
                                                </Button>
                                                <Button
                                                    type="button"
                                                    style={{ margin: "2px" }}
                                                    color="success"
                                                    outline
                                                    onClick={this.limpiarTabla}
                                                >
                                                    <i className="fa fa-dot-circle-o"></i>Ver ventas
                                                </Button>
                                            </div>
                                            {/* </div> */}
                                        </Form>
                                    </CardHeader>
                                    <CardBody>
                                        {this.state.ventas.filter(p => p.fecha === moment(this.state.startDate).format('DD/MM/yyyy')).length > 0 &&
                                            <Table responsive bordered size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        {/* <th>Fecha</th>
                            <th>Hora</th>
                            <th>Responsable de mesa</th> */}
                                                        <th>Sección</th>
                                                        <th>Observaciones</th>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Observaciones</th>
                                                        <th>Importe</th>
                                                        <th></th>
                                                        {/* <th>Importe total</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>{this.renderRows()}</tbody>
                                            </Table>}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        } else {
            return <p>No hay ventas para mostrar</p>
        }
    }

    renderRows() {
        let items = this.state.items;
        let ventas = this.state.ventas;
        // let productos = this.state.productos;
        return !items
            ? console.log("NULL", null)
            : ventas.filter(v => v.fecha === moment(this.state.startDate).format('DD/MM/yyyy')).map((unaVenta, index) => {
                let itemsDetallesVentaLista = items.filter(i => i.ventaId === unaVenta.id)
                return (
                    <VentasListaRow
                
                        key={index}
                        index={index}
                        items={itemsDetallesVentaLista}
                        item={this.state.item}
                        ventas={ventas}
                        venta={unaVenta}
                        selector={this.seleccionar}
                        actualizarAlEliminar={this.actualizarAlEliminar}
                        eliminarPedido={this.eliminarPedido.bind(this)}
                        toggle={this.toggle}
                    />
                );
            });
    }
}

export default VentasLista;