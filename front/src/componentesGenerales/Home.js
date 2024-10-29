import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={LinkContainer} to="/">
                        <Nav.Link>Gestión de Sistema</Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/features">
                                <Nav.Link>Características</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/pricing">
                                <Nav.Link>Precios</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <Container fluid>
                <Row>
                    <Col md={2} className="bg-light sidebar">
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <LinkContainer to="/home">
                                <Nav.Link>Inicio</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/users">
                                <Nav.Link>Usuarios</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/settings">
                                <Nav.Link>Configuración</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Col>
                    <Col md={10} className="content">
                        <Outlet />
                    </Col>
                </Row>
            </Container> */}
        </div>
    );
};

export default Home;
