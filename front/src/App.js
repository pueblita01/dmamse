import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './componentesGenerales/NavbarComponent';
import SidebarComponent from './componentesGenerales/SidebarComponent';
import ListaClientes from './componentesPersonas/ListaClientes';
import ListaProveedores from './componentesPersonas/ListaProveedores';
import Home from './componentesGenerales/Home';
import LoginComponent from './componentesGenerales/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="contenedor">
        <div className="d-flex">
          <SidebarComponent />
          <div className="flex-grow-1">
            <NavbarComponent />
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/home" element={<Home />} />
              <Route path="/listaClientes" element={<ListaClientes />} />
              <Route path="/listaProveedores" element={<ListaProveedores />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
