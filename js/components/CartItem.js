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