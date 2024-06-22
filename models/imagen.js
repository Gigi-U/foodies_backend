class Imagen {
    constructor(id, seccion, url, producto_id, combo_id) {
        this.id = id;
        this.seccion = seccion; // 'producto' o 'combo'
        this.url = url;
        this.producto_id = producto_id;
        this.combo_id = combo_id;
    }
}
module.exports = Imagen;