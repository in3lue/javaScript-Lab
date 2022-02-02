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