import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../Css/NavBarComponent.css'

const NavbarComponent = () => {
  return (
    <Navbar className="navbar-custom" bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={LinkContainer} to="/home">
        <Nav.Link>創造SOUZOU</Nav.Link>
        {/* <Nav.Link>創始 soushi</Nav.Link> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/listaProveedores">
            <Nav.Link>Proveedores</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/listaClientes">
            <Nav.Link>Clientes</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/empleados">
            <Nav.Link>Empleados</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/listaVentas">
            <Nav.Link>VentasLista</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/stock">
            <Nav.Link>Stock</Nav.Link>
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
