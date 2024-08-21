import React, { useEffect, useState } from "react";
import RowProveedor from "./RowProveedores";

const ListaProveedor = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    // Fetch all proveedores from the backend
    fetch("/proveedores")
      .then(response => response.json())
      .then(data => setProveedores(data))
      .catch(error => console.error("Error fetching proveedores:", error));
  }, []);

  return (
    <div>
      <h2>Lista de Proveedores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Empresa</th>
            <th>Cuil/Cuit</th>
            <th>Email</th>
            <th>Contacto</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <RowProveedor key={proveedor.id} proveedor={proveedor} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProveedor;
