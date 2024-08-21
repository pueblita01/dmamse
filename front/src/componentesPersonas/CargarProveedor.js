import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CargarProveedor = () => {
  const { id_proveedor } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    cuilcuitP: "",
    email: "",
    contacto: "",
    notas: ""
  });

  useEffect(() => {
    if (id_proveedor) {
      // Fetch the existing proveedor details
      fetch(`/proveedor/existente/${id_proveedor}`)
        .then(response => response.json())
        .then(data => setFormData(data))
        .catch(error => console.error("Error fetching proveedor:", error));
    }
  }, [id_proveedor]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id_proveedor ? "PUT" : "POST";
    const url = id_proveedor ? `/proveedor/${id_proveedor}` : "/proveedor/nuevo";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(() => {
        alert(`Proveedor ${id_proveedor ? "actualizado" : "creado"} con éxito`);
        navigate("/proveedores");
      })
      .catch(error => console.error(`Error ${id_proveedor ? "updating" : "creating"} proveedor:`, error));
  };

  return (
    <div>
      <h2>{id_proveedor ? "Editar Proveedor" : "Cargar Proveedor"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Empresa:</label>
          <input 
            type="text" 
            name="nombreEmpresa" 
            value={formData.nombreEmpresa} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Cuil/Cuit:</label>
          <input 
            type="number" 
            name="cuilcuitP" 
            value={formData.cuilcuitP} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Contacto:</label>
          <input 
            type="number" 
            name="contacto" 
            value={formData.contacto} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Notas:</label>
          <input 
            type="text" 
            name="notas" 
            value={formData.notas} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">{id_proveedor ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default CargarProveedor;
