import React from "react";
import { Button} from "reactstrap";

class VentasListaRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
      items: props.items,
      item: props.item,
      producto: props.unProducto,
      venta: props.venta,
      campoVisible: false,
      inputVisible: true,
      edit: {}
    };
    this.eliminarPedidoConItems = this.eliminarPedidoConItems.bind(this);
    this.seleccionarPedido = this.seleccionarPedido.bind(this);
  }

  eliminarPedidoConItems = (id) => {
    fetch("http://localhost:8383/venta/delete/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.props.actualizarAlEliminar(this.props.venta));
  };

  seleccionarPedido() {
    this.props.selector(this.props.venta);
    // console.log("seleccionar___", this.props.venta);
    this.props.toggle();
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.venta !== this.props.venta) {
      this.setState({ venta: nextProps.venta });
    }
    if (nextProps.unProducto !== this.props.unProducto) {
      this.setState({ unProducto: nextProps.unProducto });
    }
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
    if (nextProps.item !== this.props.item) {
      this.setState({ item: nextProps.item });
    }
    if (nextProps.listaProductos !== this.props.listaProductos) {
      this.setState({ listaProductos: nextProps.listaProductos });
    }
  }

  handleVisibility = (e, id) => {
    const mayEdit = this.state.edit[`input-${id}`] || false
    console.log("visibility",id,this.state.edit,mayEdit)
    var nuevoPedido = Object.assign({}, this.state.venta);
    nuevoPedido[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ venta: nuevoPedido });
    this.setState({
      edit: Object.assign({}, this.state.edit, { [`input-${id}`]: !mayEdit })
    })
  }

  handleChangePedido = (e) => {
    var nuevoPedido = Object.assign({}, this.state.venta);
    nuevoPedido[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ venta: nuevoPedido });
    // console.log("item handle change", this.state.venta.ItemsPedido);
    // console.log("productos", this.state.productos);
  }
  // <Mutation  mutation={DELETE_CURRENT_PRODUCT}>
  // {(deleteproduct, { data }) => (
  //   <td><button onClick={() => deleteproduct({variables: {_id: product._id }})}>Eliminar</button></td>
  // )}
  // </Mutation> 

  render = () => {
    let items = this.state.items

    let listaProductos = items.map((i, index) =>
      <tr key={index}>
        {i.productoId}</tr>)
    let listaCantidad = items.map((i, index) => <tr key={index}>
      {i.cantidad}</tr>)
    let listaObservaciones = items.map((i, index) => <tr key={index}>
      {i.observaciones}</tr>)
    let listaImporte = items.map((i, index) => <tr key={index}>
      ${i.importe}</tr>)

    return (
      <tr>
        <td key="id">{this.props.venta.id}</td>
        {/* <td>{this.props.venta.Fecha}</td>
        <td>{this.props.venta.Hora}</td>
        <td>{this.props.venta.responsableDeMesa}</td> */}
        <td key="seccion">{this.props.venta.seccion}</td>
        {/* <td key="observacionesPedido">{this.props.venta.observaciones}</td> */}
        <td onClick={(e) => this.handleVisibility(e, this.props.venta.id)}>
          <p>{this.state.edit[`input-${this.props.venta.id}`] ?
            <input value={this.props.venta.observaciones}
              type="text"
              id="observaciones"
              name="observaciones"
              onChange={this.handleChangePedido}
               />
            : this.props.venta.observaciones}</p>
        </td>
        <td key="producto">{listaProductos}</td>
        <td key="cantidad">{listaCantidad}</td>
        <td key="observaciones">{listaObservaciones}</td>
        <td key="importe">{listaImporte}</td>
        {/* <td key="importeTotal">{}</td> */}
        {Boolean(this.props.pedidos.length) && (
          <td>
            <Button
              color="danger"
              size="btn-xs"
              onClick={() => this.eliminarPedidoConItems(this.props.venta.id)}
            >
              <i className="cui-trash icons font-1xl d-block mt-1"></i>
            </Button>{" "}
            &nbsp;&nbsp;
            {/* <Button
              className="btn #e65100 orange darken-4"
              onClick={this.seleccionarPedido}
            >
              <i className="fa fa-dot-circle-o">{""} Editar</i>
            </Button> */}
          </td>
        )}
      </tr>
    );
  };
}

export default VentasListaRow;