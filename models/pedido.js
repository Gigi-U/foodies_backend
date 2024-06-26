class Pedido {
    constructor(id, nombreCliente, emailCliente, precioTotal, entregado,productos=[],combos=[]) {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.emailCliente = emailCliente;
        this.precioTotal = precioTotal;
        this.entregado = entregado;
        this.productos = productos;
        this.combos= combos;
    }
}
module.exports= Pedido;