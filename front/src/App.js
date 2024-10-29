import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './componentesGenerales/NavbarComponent';
import SidebarComponent from './componentesGenerales/SidebarComponent';
import Home from './componentesGenerales/Home';
import LoginComponent from './componentesGenerales/Login';
import './App.css';
import ListaClientes from './componentesPersonas/ListaClientes';
import ListaProveedores from './componentesPersonas/ListaProveedores';
import Empleados from './componentesPersonas/Empleados';
import Stock from './componentesPedidos/Stock';
import Ventas from './componentesPedidos/VentasLista';


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
              <Route path="/stock" element={<Stock/>} />
              <Route path="/empleados" element={<Empleados/>} />
              <Route path="/listaVentas" element={<Ventas/>} />

              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
