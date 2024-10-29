// src/components/Sidebar.js

import React, { useState, useRef, useEffect } from 'react';
import { Collapse } from 'reactstrap';
import '../Css/SidebarComponent.css'; // Importa el CSS para el sidebar

const SidebarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null); // Referencia al contenedor del sidebar

    // Función para manejar el mousemove
    const handleMouseMove = (event) => {
        if (event.clientX < 500 && !isOpen) { // Cambia el valor para ajustar el área de activación
            setIsOpen(true); // Abre el sidebar
        }
    };

    // Manejar clics fuera del sidebar
    const handleClickOutside = (event) => {
        // Verifica si la referencia existe y contiene el elemento del sidebar
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false); // Cierra el sidebar si el clic está fuera de él
        }
    };

    useEffect(() => {
        // Añadir el evento de clic para cerrar el sidebar
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div onMouseMove={handleMouseMove} className="sidebar-container">
            {/* Contenedor para el sidebar y la referencia */}
            <div ref={sidebarRef}>
                <Collapse isOpen={isOpen}>
                    <div className="sidebar">
                        <h2>Menú</h2>
                        <ul>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Perfil</a></li>
                            <li><a href="#">Mantenimiento</a></li>
                            <li><a href="#">Limpieza</a></li>
                            <li><a href="#">Configuración</a></li>
                        </ul>
                    </div>
                </Collapse>
            </div>
            <div className={`content ${isOpen ? 'content-shifted' : ''}`}>
                {/* <h1 style={{ fontSize: '16px' }}>Bienvenido a la Sodería</h1> */}
                {/* <p style={{ fontSize: '12px' }}>Este es el contenido principal de la página.</p> */}
            </div>
        </div>
    );
};

export default SidebarComponent;

// import { Nav } from 'react-bootstrap';

// const SidebarComponent = () => {
//   return (
//     <div className="d-flex flex-column vh-100 bg-light p-3">
//       <Nav className="flex-column">
//         <Nav.Link href="#gastos">Gastos</Nav.Link>
//         <Nav.Link href="#inventario">Inventario</Nav.Link>
//         <Nav.Link href="#configuracion">Configuracion</Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// export default SidebarComponent;