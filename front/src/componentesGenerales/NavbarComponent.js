import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={LinkContainer} to="/home">
        <Nav.Link>DULCE MIEL</Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/home">
            <Nav.Link>Inicio</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/listaProveedores">
            <Nav.Link>Proveedores</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/listaClientes">
            <Nav.Link>Clientes</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
