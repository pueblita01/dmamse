// src/components/Stock.js
import React from 'react';
import '../Css/Stock.css';
import { Table, Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            nuevoProducto: {
                nombre: '',
                cantidad: 0,
                precio: 0,
            },
        };
    }

    componentDidMount() {
        this.fetchProductos();
    }

    fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/stock');
            const data = await response.json();
            this.setState({ productos: data });
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    agregarProducto = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.nuevoProducto),
            });

            if (response.ok) {
                this.setState({
                    nuevoProducto: { nombre: '', cantidad: 0, precio: 0 },
                });
                this.fetchProductos(); // Actualiza la lista de productos después de agregar
            } else {
                console.error('Error al agregar el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    eliminarProducto = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/stock/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.fetchProductos(); // Actualiza la lista de productos después de eliminar
            } else {
                console.error('Error al eliminar el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            nuevoProducto: {
                ...prevState.nuevoProducto,
                [name]: name === 'cantidad' ? parseInt(value) : name === 'precio' ? parseFloat(value) : value,
            },
        }));
    };

    render() {
        const { productos, nuevoProducto } = this.state;

        return (
            <Container>
                <h1 className="text-center">Stock de Sodería</h1>
                <Form onSubmit={this.agregarProducto}>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="nombre">Nombre</Label>
                                <Input
                                    type="text"
                                    name="nombre"
                                    value={nuevoProducto.nombre}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="cantidad">Cantidad</Label>
                                <Input
                                    type="number"
                                    name="cantidad"
                                    value={nuevoProducto.cantidad}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="precio">Precio</Label>
                                <Input
                                    type="number"
                                    name="precio"
                                    value={nuevoProducto.precio}
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button type="submit">Agregar Producto</Button>
                </Form>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                <td>${producto.precio.toFixed(2)}</td>
                                <td>
                                    <Button color="danger" onClick={() => this.eliminarProducto(producto.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Stock;
