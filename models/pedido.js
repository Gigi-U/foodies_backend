class Pedido {
    constructor(id, nombreCliente, emailCliente, precioTotal, entregado, producto_id, combo_id) {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.emailCliente = emailCliente;
        this.precioTotal = precioTotal;
        this.entregado = entregado;
        this.producto_id = producto_id;
        this.combo_id = combo_id 
    }
}
module.exports= Pedido;