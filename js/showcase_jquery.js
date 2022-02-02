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
// const btnSaveCart = document.getElementById("btn_saveCart");
// btnSaveCart.addEventListener('click', () => carrito.saveCart());

// const btnEmptyCart = document.getElementById("btn_emptyCart");
// btnEmptyCart.addEventListener('click', () => carrito.emptyCart());

// const btnRestoreCart = document.getElementById("btn_restoreCart");
// btnRestoreCart.addEventListener('click', () => carrito.restoreCart());

// reemplacé js puro por jquery
    $("#btn_saveCart").click(() => carrito.saveCart());
    $("#btn_emptyCart").click(() => carrito.emptyCart());
    $("#btn_restoreCart").click(() => carrito.restoreCart());
    $("#delivery").hide();
    console.log('lol');

    $("#backToOrder").click(()=>{
        $("#order").show();
        $("#carrito .buttons").show();
        $("#delivery").hide();
    });

    $("#setDelivery").click(()=>{
        $("#order").hide();
        $("#carrito .buttons").hide();
        $("#delivery").show();

        // llamada a API
        // codigo de https://jsonplaceholder.typicode.com/
        fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then(user => {
            $("#delivery .name").html(user.name);
            $("#delivery .street").html(user.address.street);
            $("#delivery .suite").html(user.address.suite);
            $("#delivery .zipcode").html(user.address.zipcode);
        });

    });
