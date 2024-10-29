import React from "react";
import { Button } from "reactstrap";
import '../Css/ListaClientes.css';

class RowCliente extends React.Component {
  eliminarCliente = () => {
    const { cliente, actualizarAlEliminar } = this.props;
    console.log('Eliminando cliente:', cliente);
    fetch(`http://localhost:8383/cliente/${cliente.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        actualizarAlEliminar(cliente);
      })
      .catch(err => console.error("Error al eliminar cliente:", err));
  };

  render() {
    const { cliente, direcciones, telefonos, razonSocial, handleEditClick ,id_cliente} = this.props;
    let direccionesCliente = direcciones.filter((unaDir) => unaDir.clienteDirId === id_cliente)
    let telefonosCliente = telefonos.filter((unTel) => unTel.clienteTelId === id_cliente)

    console.log('razonsocialrowclientehijo',razonSocial)
    return (
      <tr>
        <td>{cliente.nombreCliente}</td>
        <td>
          {direccionesCliente && direccionesCliente.length > 0 && (
            <table className="table-custom">
              {/* <thead>
                <tr>
                  <th>Calle</th>
                  <th>Número</th>
                  <th>Ciudad</th>
                  <th>Provincia</th>
                  <th>Código Postal</th>
                  <th>País</th>
                </tr>
              </thead> */}
              <tbody>
                {direccionesCliente.map((unaDir, unIndex) => (
                  <tr key={unIndex}>
                    <td>{unaDir.calle}</td>
                    <td>{unaDir.numero}</td>
                    <td>{unaDir.ciudad}</td>
                    <td>{unaDir.provincia}</td>
                    <td>{unaDir.codigoPostal}</td>
                    <td>{unaDir.pais}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </td>
        <td>
          {telefonosCliente && telefonosCliente.length > 0 && (
            <table className="table-custom">
              <tbody>
                {telefonosCliente.map((unTel, unIndex) => (
                  <tr key={unIndex}>
                    <td>{`${unTel.codigopais} ${unTel.caracteristica} ${unTel.numero}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </td>
        <td>{cliente.email}</td>
        <td>{razonSocial}</td>
        <td>
          <Button className="btn-edit" onClick={() => handleEditClick(cliente, razonSocial, direccionesCliente, telefonosCliente)}>
            <i className="fas fa-edit"></i>
          </Button>{" "}
          <Button className="btn-delete" onClick={this.eliminarCliente}>
            <i className="fas fa-trash"></i> 
          </Button>
        </td>
      </tr>
    );
  }
}

export default RowCliente;
