class Cart {
    constructor() {
        this.productos = []
        this.productosDiv = document.getElementById('cart_productos')
        this.impuestos = 0.21
        this.totalAPagar = 0

        this.cantProd_elem = document.getElementById('cantProd')
        this.subtotal_elem = document.getElementById('subtotal')
        this.impuestos_elem = document.getElementById('impuestos')
        this.totalAPagar_elem = document.getElementById('totalAPagar')
    }

    addToCart(articulo) {
        this.producto = articulo
        console.log('-------------------')

        //1. determinar si articulo esta en la lista
        const art = this.productos.find(x => x.producto.id == articulo.id)

        if (art == undefined) {
            console.log('agregaste ' + articulo.nombre + ' al carrito')
            console.log('  -> ', articulo)
                //1.a (no lo tengo en la lista) -> creo y agrego nuevo CartItem
            const nuevoProducto = new CartItem(articulo)
            this.productos.unshift(nuevoProducto)

            // animación

            //final 
            const targetElem = $('#cart_productos');
            const target = {
                x: targetElem.position().left,
                y: targetElem.position().top,
                w: targetElem.width(),
                h: '3rem'
            };

            const $originElem = $('#catalogo_productos div.product[ref="' + articulo.id + '"]');
            const origin = {
                x: $originElem.position().left,
                y: $originElem.position().top,
                w: $originElem.width(),
                h: $originElem.height()
            };

            const $anim = $originElem.clone().css({
                'position': 'fixed',
                'left': origin.x + 'px',
                'top': origin.y + 'px',
                'width': origin.w,
                'height': origin.h
            }).appendTo('#catalogo_productos');

            $anim.animate({
                left: target.x,
                top: target.y,
                width: target.w,
                height: target.h
            }).fadeOut(150, () => {
                this.render();
            });




        } else {
            //1.b (lo tengo en la lista) -> sumo 1 a la prop cantidad
            art.cantidad++;
            this.render();

            console.log('sumo 1 a ' + articulo.nombre + ' en el carrito')
            console.log('  -> ', articulo)
        }

        this.calcularCosto()

        // muestro el carrito actualizado


        //-- totales -------
    }

    calcularCosto() {
        //calculo
        let subtot = 0
        let impuesto = 0
        let cantItems = 0

        //for-of/////////////
        for (const prod of this.productos) {
            cantItems += prod.cantidad
            subtot += prod.producto.precio * prod.cantidad
            impuesto += prod.producto.precio * prod.cantidad * this.impuestos
        }
        const total = subtot + impuesto

        //muestro

        //array-length////////
        //this.cantProd_elem.innerHTML = this.productos.length;

        this.cantProd_elem.innerHTML = cantItems
        this.subtotal_elem.innerText = subtot
        this.impuestos_elem.innerText = impuesto
        this.totalAPagar_elem.innerText = total
    }

    removeFromCart(articulo) {
        console.log('-------------------')

        //busco el indice del prod //-- Array.findIndex
        const index = this.productos.findIndex(x => x.producto.id == articulo.id)
        const prod = this.productos[index]

        if (prod.cantidad > 1) {
            //
            prod.cantidad--
                console.log(
                    'restaste una unidad de ' + prod.producto.nombre + ' del carrito'
                )
        } else {
            const nuevoArray = this.productos.splice(index, 1)
            console.log('eliminaste el ítem ' + (index + 1) + ' del carrito')
            console.log('    producto eliminado: ' + nuevoArray[0].id)
        }

        this.calcularCosto()

        // muestro el carrito con mi array sin el producto que borré
        this.render()
    }

    checkout(importeRecibido) {}

    viewCart() {
        console.log(
            'tenés 1x ' + this.producto.nombre + ': $' + this.producto.precio
        )
        console.log('       impuestos $' + this.producto.precio * this.impuestos)
        console.log(
            '       subtotal  $' + this.producto.precio * (1 + this.impuestos)
        )
    }

    // persistencia usando localStorage ////////////
    // guardar
    saveCart() {
        console.log('-----\n- Guardar carrito')
        localStorage.setItem('carrito', JSON.stringify(carrito.productos))
        showSnackbar('el carrito fue guardado correctamente')
    }

    // limpiar
    emptyCart() {
        console.log('-----\n- Limpiar carrito')

        this.productos = []
        this.calcularCosto()
        this.render()

        console.log(`el array de productos está vacío`)
        showSnackbar('tu carrito está vacío')
    }

    // recuperar
    restoreCart() {
        showSnackbar('se recuperó tu carrito')
        console.log('-----\n- Recuperar carrito')

        const productos_recuperados = JSON.parse(localStorage.getItem('carrito'))
        productos_recuperados.forEach(item => {
            for (let i = 0; i < item.cantidad; i++) {
                carrito.addToCart(item.producto)
            }
        })
        this.calcularCosto()
        this.render()

        console.log(
            `${productos_recuperados.length} items recuperados del localStorage`
        )
    }

    render() {
        // limpio el div con los productos
        this.productosDiv.innerHTML = ''

        //muestro los productos que tengo en mi array
        for (const item of this.productos) {
            const divProd = item.render(this.productosDiv)

            // agrego botones +/-
            const btnPlus = document.createElement('button')
            btnPlus.innerHTML = '+'
            btnPlus.onclick = () => {
                this.addToCart(item.producto)
            }
            divProd.appendChild(btnPlus)

            const btnLess = document.createElement('button')
            btnLess.innerHTML = '-'
            btnLess.onclick = () => {
                this.removeFromCart(item.producto)
            }
            divProd.appendChild(btnLess)

            //como hago para que se llame desde cartItem?
        }
    }
}