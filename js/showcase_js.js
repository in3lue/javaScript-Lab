"use strict";
//definir productos y mostrar productos
//definir y mostrar catálogo de productos - góndola
//definir carrito
//definir AddCart
//mostrar carrito
//ordenar por nombre
//ordenar por precio
//sumar artículos al carrito
//sacar artículos del carrito

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
btnSaveCart.addEventListener("click", () => carrito.saveCart());

const btnEmptyCart = document.getElementById("btn_emptyCart");
btnEmptyCart.addEventListener("click", () => carrito.emptyCart());

const btnRestoreCart = document.getElementById("btn_restoreCart");
btnRestoreCart.addEventListener("click", () => carrito.restoreCart());