import React from "react";
import { Button, Form, FormGroup, Label, Input, Col, ModalBody, ModalFooter } from "reactstrap";

class CargarCliente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cliente: props.cliente || { nombre: "", direccion: "", telefono: "" },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.cliente !== prevProps.cliente) {
            this.setState({ cliente: this.props.cliente });
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            cliente: { ...prevState.cliente, [name]: value },
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        const { cliente } = this.state;
        const method = cliente.id_cliente ? "PUT" : "POST";
        const url = cliente.id_cliente
            ? `http://localhost:8383/cliente/${cliente.id_cliente}`
            : "http://localhost:8383/cliente/nuevo";

        fetch(url, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        })
            .then(() => this.props.listadoClientes())
            .then(() => this.props.toggle())
            .catch((err) => console.error("Error:", err));
    }

    render() {
        const { nombre, direccion, telefono } = this.state.cliente;

        return (
            <Col xs="12" md="12">
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Col md="3">
                                <Label for="nombre">Nombre completo</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Completa Nombre..."
                                    value={nombre}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label for="direccion">Dirección</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    placeholder="Completa dirección..."
                                    value={direccion}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label for="telefono">Nro teléfono</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Completa teléfono..."
                                    value={telefono}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <Button color="success" type="submit">
                            Guardar cliente
                        </Button>
                    </Form>
                </ModalBody>
                <ModalFooter />
            </Col>
        );
    }
}

export default CargarCliente;
