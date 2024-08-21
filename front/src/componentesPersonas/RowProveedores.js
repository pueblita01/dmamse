import React from "react";
import { useNavigate } from "react-router-dom";

const RowProveedor = ({ proveedor }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este proveedor?");
    if (confirmDelete) {
      fetch(`/proveedor/${proveedor.id}`, { method: "DELETE" })
        .then(() => {
          alert("Proveedor eliminado con éxito");
          window.location.reload(); // Refresh the page after deletion
        })
        .catch(error => console.error("Error deleting proveedor:", error));
    }
  };

  return (
    <tr>
      <td>{proveedor.id}</td>
      <td>{proveedor.nombreEmpresa}</td>
      <td>{proveedor.cuilcuitP}</td>
      <td>{proveedor.email}</td>
      <td>{proveedor.contacto}</td>
      <td>{proveedor.notas}</td>
      <td>
        <button onClick={() => navigate(`/proveedor/editar/${proveedor.id}`)}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </td>
    </tr>
  );
};

export default RowProveedor;
