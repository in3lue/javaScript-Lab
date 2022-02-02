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