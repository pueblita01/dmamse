import React from "react";
import { Button } from "reactstrap";

class RowCliente extends React.Component {
    eliminarCliente = () => {
        const { cliente, actualizarAlEliminar } = this.props;
        fetch(`http://localhost:8383/cliente/${cliente.id_cliente}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(() => actualizarAlEliminar(cliente))
            .catch(err => console.error("Error deleting client:", err));
    };

    render() {
        const { cliente, seleccionar } = this.props;

        return (
            <tr>
                <td>{cliente.nombreCliente}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.username}</td>
                <td>{cliente.email}</td>
                <td>
                    <Button
                        color="primary"
                        size="sm"
                        onClick={() => seleccionar(cliente)}
                    >
                        Editar
                    </Button>{" "}
                    <Button
                        color="danger"
                        size="sm"
                        onClick={this.eliminarCliente}
                    >
                        Eliminar
                    </Button>
                </td>
            </tr>
        );
    }
}

export default RowCliente;
