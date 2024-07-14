import React from 'react';
import NavbarComponent from './componentesPrincipales/NavbarComponent';
import SidebarComponent from './componentesPrincipales/SidebarComponent';
import LoginComponent from './componentesPrincipales/LoginComponent';
import './App.css'; 

const App = () => {
  return (
    <div className="d-flex">
      <SidebarComponent />
      <div className="flex-grow-1">
        <NavbarComponent />
        <div className="container mt-4">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
