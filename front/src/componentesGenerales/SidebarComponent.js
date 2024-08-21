import { Nav } from 'react-bootstrap';

const SidebarComponent = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light p-3">
      <Nav className="flex-column">
        <Nav.Link href="#gastos">Gastos</Nav.Link>
        <Nav.Link href="#inventario">Inventario</Nav.Link>
        <Nav.Link href="#configuracion">Configuracion</Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarComponent;