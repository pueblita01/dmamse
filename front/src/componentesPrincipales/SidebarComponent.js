import { Nav } from 'react-bootstrap';

const SidebarComponent = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light p-3">
      <Nav className="flex-column">
        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
        <Nav.Link href="#profile">Profile</Nav.Link>
        <Nav.Link href="#settings">Settings</Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarComponent;