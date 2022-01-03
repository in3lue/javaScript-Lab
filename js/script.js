"use strict";
//definir productos y mostrar productos
//definir y mostrar catálogo de productos - góndola
//definir carrito
//definir AddCart
//mostrar carrito
//sumar artículos al carrito
//sacar artículos del carrito
//ordenar por nombre
//ordenar por precio

/// Clases //////////////////////////////////////////////////////////////////////////////////////////////
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.color = "#CCC";
    this.familia = "";
    console.log(". se creo una instancia de Producto");
  }

  render = (targetDiv) => {
    //wrapper
    const productoDiv = document.createElement("div");
    productoDiv.className = "product";
    productoDiv.setAttribute("ref", this.id);
    productoDiv.style.backgroundColor = this.color;

    const tituloDiv = document.createElement("div");
    tituloDiv.className = "titulo";
    tituloDiv.innerHTML = this.nombre;
    tituloDiv.setAttribute("ref", this.id);
    productoDiv.appendChild(tituloDiv);

    const familiaDiv = document.createElement("div");
    familiaDiv.className = "familia";
    familiaDiv.innerHTML = this.familia;
    familiaDiv.setAttribute("ref", this.id);
    productoDiv.appendChild(familiaDiv);

    const precioDiv = document.createElement("div");
    precioDiv.className = "precio";
    precioDiv.innerHTML = `$ ${this.precio}`;
    precioDiv.setAttribute("ref", this.id);
    productoDiv.appendChild(precioDiv);

    //agrego a lista de productos
    targetDiv.appendChild(productoDiv);
    return productoDiv;
  };
}

// -------------------------
class Catalogo {
  constructor() {
    this.productos = [];
    this.familia = "";

    this.catalogoDiv = document.getElementById("catalogo_productos");
    this.btnSortByName = document.getElementById("btn_sortByName");
    this.btnSortByPrice = document.getElementById("btn_sortByPrice");

    //defino click
    this.btnSortByName.onclick = () => this.ordenarPorNombre();
    this.btnSortByPrice.onclick = () => this.ordenarPorPrecio();
  }

  //-- metodos de control
  ordenarPorNombre() {
    console.log("-----------------------------");
    console.log("-- ordenar por Nombre");

    // copiado de https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#examples
    this.productos = listaProductos.sort(function (a, b) {
      var nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
      var nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    this.render();
  }

  ordenarPorPrecio() {
    console.log("-----------------------------");
    console.log("-- ordenar por Precio");

    this.productos = listaProductos.sort((x, y) => x.precio - y.precio);
    this.render();
  }

  //-- metodos de vista
  render() {
    this.catalogoDiv.innerHTML = "";

    //hago render //-- for-of -----
    for (const prod of this.productos) {
      const ele = prod.render(this.catalogoDiv);
      ele.onclick = (e) => {
        console.log(e.target);
        const prodId = parseInt(e.target.getAttribute("ref"));
        console.log("producto seleccionado:", prodId);

        //busco el producto con -> find
        const articulo = this.productos.find((x) => x.id == prodId);
        console.log("producto ", articulo);

        carrito.addToCart(prod);
      };
    }
  }
}

// -------------------------
class Cart {
  constructor() {
    this.productos = [];
    this.productosDiv = document.getElementById("cart_productos");
    this.impuestos = 0.21;
    this.totalAPagar = 0;

    this.cantProd_elem = document.getElementById("cantProd");
    this.subtotal_elem = document.getElementById("subtotal");
    this.impuestos_elem = document.getElementById("impuestos");
    this.totalAPagar_elem = document.getElementById("totalAPagar");
  }

  addToCart(articulo) {
    this.producto = articulo;
    console.log("-------------------");
    console.log("agregaste " + articulo.nombre + " al carrito");
    console.log("  -> ", articulo);

    //array-push////////
    this.productos.push(articulo);

    this.calcularCosto();

    // muestro el carrito actualizado
    this.render();

    //-- totales -------
  }

  calcularCosto() {
    //calculo
    let subtot = 0;
    let impuesto = 0;

    //for-of/////////////
    for (const prod of this.productos) {
      subtot += prod.precio;
      impuesto += prod.precio * this.impuestos;
    }
    const total = subtot + impuesto;

    //muestro
    //array-length////////
    this.cantProd_elem.innerHTML = this.productos.length;

    this.subtotal_elem.innerText = subtot;
    this.impuestos_elem.innerText = impuesto;
    this.totalAPagar_elem.innerText = total;
  }

  removeFromCart(articulo) {
    console.log("-------------------");
    console.log("eliminaste " + articulo.nombre + " del carrito");

    //busco el indice del prod //-- Array.findIndex
    const index = this.productos.findIndex((x) => x.id == articulo.id);

    const nuevoArray = this.productos.splice(index, 1);
    console.log("    eliminaste el ítem " + (index + 1) + " del carrito");
    console.log("    producto eliminado: " + nuevoArray[0].id);

    this.calcularCosto();

    // muestro el carrito con mi array sin el producto que borré
    this.render();
  }

  checkout(importeRecibido) {}

  viewCart() {
    console.log(
      "tenés 1x " + this.producto.nombre + ": $" + this.producto.precio
    );
    console.log("       impuestos $" + this.producto.precio * this.impuestos);
    console.log("       subtotal  $" + this.producto.precio * (1 + this.impuestos)
    );
  }

  render() {
    // limpio el div con los productos
    this.productosDiv.innerHTML = "";

    //muestro los productos que tengo en mi array
    for (const prod of this.productos) {
      const divProd = prod.render(this.productosDiv);
      divProd.onclick = () => {
        this.removeFromCart(prod);
      };
    }
  }
}

/// Store ///////////////////////////////////////////////////////////////////////////////////////////////////////

const familia = {
  AZULES: 0,
  ROJOS: 1,
  AMARILLOS: 2,
  VERDES: 3,
  GRISES: 4,
};

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
//cargo los prodctos
catalogo.productos = listaProductos;
//muestro el catalogo
catalogo.render();