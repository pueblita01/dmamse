// src/components/Empleados.js
import React from 'react';
import { Table, Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import '../Css/Empleados.css'; // Importar el archivo CSS

class Empleados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empleados: [],
            nuevoEmpleado: {
                nombre: '',
                cargo: 'Repartidor', // Valor predeterminado
                salario: 0,
            },
        };
    }

    componentDidMount() {
        this.fetchEmpleados();
    }

    fetchEmpleados = async () => {
        try {
            const response = await fetch('http://localhost:8383/api/empleados');
            const data = await response.json();
            this.setState({ empleados: data });
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };

    agregarEmpleado = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8383/api/empleados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.nuevoEmpleado),
            });

            if (response.ok) {
                this.setState({
                    nuevoEmpleado: { nombre: '', cargo: 'Repartidor', salario: 0 },
                });
                this.fetchEmpleados(); // Actualiza la lista de empleados después de agregar
            } else {
                console.error('Error al agregar el empleado:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar el empleado:', error);
        }
    };

    eliminarEmpleado = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/empleados/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.fetchEmpleados(); // Actualiza la lista de empleados después de eliminar
            } else {
                console.error('Error al eliminar el empleado:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el empleado:', error);
        }
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            nuevoEmpleado: {
                ...prevState.nuevoEmpleado,
                [name]: name === 'salario' ? parseFloat(value) : value,
            },
        }));
    };

    render() {
        const { empleados, nuevoEmpleado } = this.state;

        return (
            <Container className="my-5" style={{ maxWidth: '800px' }}>
                <div className="container">
                    <h1 className="text-center">Empleados de Sodería</h1>
                    <Form onSubmit={this.agregarEmpleado}>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="nombre">Nombre</Label>
                                    <Input
                                        type="text"
                                        name="nombre"
                                        value={nuevoEmpleado.nombre}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="cargo">Cargo</Label>
                                    <Input
                                        type="select"
                                        name="cargo"
                                        value={nuevoEmpleado.cargo}
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                        <option>Repartidor</option>
                                        <option>No Repartidor</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="salario">Salario</Label>
                                    <Input
                                        type="number"
                                        name="salario"
                                        value={nuevoEmpleado.salario}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button type="submit">Agregar Empleado</Button>
                    </Form>
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cargo</th>
                                <th>Salario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map(empleado => (
                                <tr key={empleado.id}>
                                    <td>{empleado.id}</td>
                                    <td>{empleado.nombre}</td>
                                    <td>{empleado.cargo}</td>
                                    <td>${empleado.salario.toFixed(2)}</td>
                                    <td>
                                        <Button color="danger" onClick={() => this.eliminarEmpleado(empleado.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        );
    }
}

export default Empleados;
