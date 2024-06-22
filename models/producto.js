// Definición de la clase Producto
class Producto {
    constructor(id, nombre, descripcion, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagenes = []; 
    }
}
module.exports = Producto;
