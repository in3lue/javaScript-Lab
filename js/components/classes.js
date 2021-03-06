/// Clases //////////////////////////////////////////////////////////////////////////////////////////////
class Producto {
  constructor (id, nombre, precio) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.color = '#FFF'
    this.familia = ''
    this.imagen = 'img/product_' + id
    console.log('. se creo una instancia de Producto')
  }

  render = targetDiv => {
    //wrapper
    const productoDiv = document.createElement('div')
    productoDiv.className = 'product'
    productoDiv.setAttribute('ref', this.id)
    productoDiv.style.backgroundColor = this.color
    productoDiv.style.backgroundImage = 'url("' + this.imagen + '.jpg")'

    const tituloDiv = document.createElement('div')
    tituloDiv.className = 'titulo'
    tituloDiv.innerHTML = this.nombre
    tituloDiv.setAttribute('ref', this.id)
    productoDiv.appendChild(tituloDiv)

    const familiaDiv = document.createElement('div')
    familiaDiv.className = 'familia'
    familiaDiv.innerHTML = this.familia
    familiaDiv.setAttribute('ref', this.id)
    productoDiv.appendChild(familiaDiv)

    const precioDiv = document.createElement('div')
    precioDiv.className = 'precio'
    precioDiv.innerHTML = `$ ${this.precio}`
    precioDiv.setAttribute('ref', this.id)
    productoDiv.appendChild(precioDiv)

    //agrego a lista de productos
    targetDiv.appendChild(productoDiv)
    return productoDiv
  }
}

// -------------------------
class Catalogo {
  constructor () {
    this.productos = []
    this.familia = ''

    this.catalogoDiv = document.getElementById('catalogo_productos')
    this.btnSortByName = document.getElementById('btn_sortByName')
    this.btnSortByPrice = document.getElementById('btn_sortByPrice')

    //defino click
    this.btnSortByName.onclick = () => this.ordenarPorNombre()
    this.btnSortByPrice.onclick = () => this.ordenarPorPrecio()
  }

  //-- metodos de control
  ordenarPorNombre () {
    console.log('-----------------------------')
    console.log('-- ordenar por Nombre')

    // copiado de https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#examples
    this.productos = listaProductos.sort(function (a, b) {
      var nameA = a.nombre.toUpperCase() // ignore upper and lowercase
      var nameB = b.nombre.toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      // names must be equal
      return 0
    })

    this.render()
  }

  ordenarPorPrecio () {
    console.log('-----------------------------')
    console.log('-- ordenar por Precio')

    this.productos = listaProductos.sort((x, y) => x.precio - y.precio)
    this.render()
  }

  //-- metodos de vista
  render () {
    this.catalogoDiv.innerHTML = ''

    //hago render //-- for-of -----
    for (const prod of this.productos) {
      const ele = prod.render(this.catalogoDiv)
      ele.onclick = e => {
        console.log(e.target)
        const prodId = parseInt(e.target.getAttribute('ref'))
        console.log('producto seleccionado:', prodId)

        //busco el producto con -> find
        const articulo = this.productos.find(x => x.id == prodId)
        console.log('producto ', articulo)

        carrito.addToCart(prod)
      }
    }
  }
}

// -------------------------
class Cart {
  constructor () {
    this.productos = []
    this.productosDiv = document.getElementById('cart_productos')
    this.impuestos = 0.21
    this.totalAPagar = 0

    this.cantProd_elem = document.getElementById('cantProd')
    this.subtotal_elem = document.getElementById('subtotal')
    this.impuestos_elem = document.getElementById('impuestos')
    this.totalAPagar_elem = document.getElementById('totalAPagar')
  }

  addToCart (articulo) {
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

      // animaci??n
      
      //final 
      const targetElem = $('#cart_productos');
      const target = {
          x: targetElem.position().left,
          y: targetElem.position().top,
          w: targetElem.width(),
          h: '3rem'
        };
      
      const $originElem = $('#catalogo_productos div.product[ref="'+  articulo.id + '"]');
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
    }).fadeOut(150, ()=>{
        this.render();        
    });




    } else {
      //1.b (lo tengo en la lista) -> sumo 1 a la prop cantidad
      art.cantidad++
      console.log('sumo 1 a ' + articulo.nombre + ' en el carrito')
      console.log('  -> ', articulo)
    }

    this.calcularCosto()

    // muestro el carrito actualizado
    

    //-- totales -------
  }

  calcularCosto () {
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

  removeFromCart (articulo) {
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
      console.log('eliminaste el ??tem ' + (index + 1) + ' del carrito')
      console.log('    producto eliminado: ' + nuevoArray[0].id)
    }

    this.calcularCosto()

    // muestro el carrito con mi array sin el producto que borr??
    this.render()
  }

  checkout (importeRecibido) {}

  viewCart () {
    console.log(
      'ten??s 1x ' + this.producto.nombre + ': $' + this.producto.precio
    )
    console.log('       impuestos $' + this.producto.precio * this.impuestos)
    console.log(
      '       subtotal  $' + this.producto.precio * (1 + this.impuestos)
    )
  }

  // persistencia usando localStorage ////////////
  // guardar
  saveCart () {
    console.log('-----\n- Guardar carrito')
    localStorage.setItem('carrito', JSON.stringify(carrito.productos))
    showSnackbar('el carrito fue guardado correctamente')
  }

  // limpiar
  emptyCart () {
    console.log('-----\n- Limpiar carrito')

    this.productos = []
    this.calcularCosto()
    this.render()

    console.log(`el array de productos est?? vac??o`)
    showSnackbar('tu carrito est?? vac??o')
  }

  // recuperar
  restoreCart () {
    showSnackbar('se recuperar?? tu carrito')
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

  render () {
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

// -------------------------
class CartItem {
  constructor (articulo) {
    this.cantidad = 1
    this.itemDiv = undefined
    this.producto = new Producto(articulo.id, articulo.nombre, articulo.precio)
  }

  render = targetDiv => {
    console.log('CartItem.render()', targetDiv)

    //creo el row
    const itemDiv = document.createElement('div')

    //muestro cantidad
    const itemQty = document.createElement('p')
    itemQty.innerHTML = this.cantidad
    itemDiv.appendChild(itemQty)

    //muestro producto
    this.producto.render(itemDiv)

    //guardo nuevo elemento
    this.itemDiv = itemDiv

    //agrego el elemento al div padre
    targetDiv.appendChild(itemDiv)

    //devuelvo el elemento para agregar funciones (si son necesarias)
    return itemDiv
  }
}
