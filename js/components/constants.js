/// Store ///////////////////////////////////////////////////////////////////////////////////////////////////////

// const familia = {
//   AZULES: 0,
//   ROJOS: 1,
//   AMARILLOS: 2,
//   VERDES: 3,
//   GRISES: 4,
// };

const listaProductos = [
    new Producto(1, "Frutillas", 100),
    new Producto(2, "Carne Picada", 120),
    new Producto(3, "Merluza", 200),
    new Producto(4, "Cereales", 90),
    new Producto(5, "Pimienta Blanca", 50),
    new Producto(6, "Entraña", 180),
    new Producto(7, "Papas", 140),
    new Producto(8, "Sal Gruesa", 125),
    new Producto(9, "Harina Integral", 134),
    new Producto(10, "Acelga", 143),
    new Producto(11, "Aceite de Oliva", 90),
    new Producto(12, "Ananá", 50),
    new Producto(13, "Tomates", 180),
    new Producto(14, "Hamburguesas", 140),
    new Producto(15, "Lavandina", 125),
    new Producto(16, "Empanadas", 134),
];

/// "Programa" //////////////////////////////////////////////////////////////////////////////////////////////////

//creo carrito
const carrito = new Cart();

//creo catálogo
const catalogo = new Catalogo();

//cargo los productos
catalogo.productos = listaProductos;

//muestro el catalogo
catalogo.render();

// escucho eventos de botones
const btnSaveCart = document.getElementById("btn_saveCart");
btnSaveCart.addEventListener('click', () => carrito.saveCart());

const btnEmptyCart = document.getElementById("btn_emptyCart");
btnEmptyCart.addEventListener('click', () => carrito.emptyCart());

const btnRestoreCart = document.getElementById("btn_restoreCart");
btnRestoreCart.addEventListener('click', () => carrito.restoreCart());