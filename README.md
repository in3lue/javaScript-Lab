#### javaScript-Lab by William Gómez

#

# REPASO

## Variables
Responden a la pregunta: Necesito guardar algun valor en memoria?

### Variables: Definiciones
- Necesito almacenar un mensaje?
```js
var variableString = "Mensaje"
```

- Necesito guardar un número?
```js
var variableNumerica = 3
var variableNumerica = 3.4
```

- Necesito guardar una condición? 
- Necesito guardar un valor de verdadero o falso.
```js
var variableBooleana = true
var variableBooleana = false
var variableBooleana = 5 > 4
```

- Necesito crear una variable pero no asignarle su valor porque va cambiar dependiendo de la entrada del usuario?
```js
var variable;
```
  Luego en el código a esta variable se le asigna un valor.
  
### Variables: LET vs CONST
- Mi variable puede tener varios valores a lo largo de la ejecución del código?
```js
let variableString = "Mensaje"

variableString = "Mensaje 2"
```

- Mi variable una vez creada no va cambiar su valor?
```js
const valorIngresado = prompt("Ingrese mensaje")
const ESPACIO = " " // Notese que cuando el programador quiere enfatizar que es una constante, escribe su nombre en mayuscula
const PI = 3.1416
const GOOGLE = "Google"
const TASA_INTERES = 0.89
const IVA = 0.21
```

## Condicionales
Responden a la pregunta: Como hacer para ejecutar lineas de codigo dependiendo de una condicion?

```js
if (condicion) {
//
}
```

### Condicionales: IF
- Necesito correr estas lineas si se cumple una condicion?
```js
if (edad > 18) {
  console.log("Es mayor de edad")
}
```

### Condicionales: IF - ELSE
- Necesito correr estas lineas si se cumple una condicion pero si no se cumple quiero correr estas otras lineas?
```js
if (edad > 18) {
  console.log("Es mayor de edad")
} else {
  console.log("Es menor de edad")
}
```

### Condicionales: IF - ELSE IF
- Tengo varias condiciones que quiero ir revisando para ver cual se cumple?
```js
if (edad > 0 && edad < 18) {
  console.log("Es un nino")
} else if (edad >= 18 && edad < 60) {
  console.log("Es un adulto")
} else {
  console.log("Es un anciano")
}
```

### Condicionales: SWITCH
- Tengo varias casos que quiero ir revisando para ver cual caso se seleccionó?
```js
const marca = prompt("Ingrese una marca de ropa.")

switch (marca) {
  case "ADIDAS": 
    console.log("Los productos de esta marca no son importados")
    break
  case "NIKE": 
    console.log("Los productos de Nike toman 10 días en llegar")
    break
  case "PUMA": 
    console.log("No contamos con productos puma")
    break
  default: 
    console.log("Seleccione una de las marcas.")
    break
}
```

- Cuando el break no es necesario? Cuando quiero combinar varias condiciones.
```js
const marca = prompt("Ingrese una marca de ropa.")

switch (marca) {
  case "ADIDAS": 
  case "NIKE": 
    console.log("Los productos toman 10 días en llegar")
    break
  case "PUMA": 
    console.log("No contamos con productos puma")
    break
  default: 
    console.log("Seleccione una de las marcas.")
    break
}
```

## Bucles
Responden a la pregunta: Como hacer para que se ejecuten lineas de codigo varias veces?

### Bucles - Ciclos: FOR
- Quiero repetir una acción un número de pasos determinados
```js
for (let i=1; i<=10; i++) {
  console.log("Hola mundo 10 veces") 
}
```

- Quiero repetir una acción un número de pasos determinados pero quiero que vaya usando el número de la iteracion
```js
for (let i=1; i<=10; i++) {
  console.log("Iteración:" + i) 
}
```

-Quiero crear un contador decreciente:
```js
for (let numero=10; numero>0; numero=numero-1) {
  console.log(numero) 
}
```

Tabla de multiplicar del 7
```js
for (let i=1; i<=10; i++) {
  console.log("7 x " + i + " = " + (i*7));
}
```

### Bucles - Ciclos: WHILE
- Puedo usarlo como el FOR y esperar a que un numero vaya aumentando hasta un máximo:
```js
let numero = 1
while (numero <= 10) {
  console.log("7 x " + numero + " = " + (numero*7));
  numero++;
}
```

- Puedo usarlo para tener ciclos infinitos hasta que el usuario haga una acción especifica:
```js
while (true) {
  const entrada = prompt("Ingrese un mensaje. Escriba SALIR para salir")
  if (entrada === "SALIR") {
    console.log("Saliendo...")
    break
  }
  
  console.log("Mensaje escrito: " + entrada)
}
```

### Bucles - Ciclos: DO - WHILE
- Puedo preguntar por una condición y si se sigue cumpliendo se sigue repitiendo el código. Algo diferente con el WHILE es que las lineas de codigo se corren una vez, con el while puede que nunca se corran las lineas si la condicion es falsa desde el principio.
```js
let i = 1
do { // Se corre al menos una vez
  const entrada = prompt("Ingrese un mensaje.")
  console.log("Mensaje escrito: " + entrada)
  i++;
} while (i < 1)
```

```js
let i = 1
while (i < 1) { // No se corre nada
  const entrada = prompt("Ingrese un mensaje.")
  console.log("Mensaje escrito: " + entrada)
  i++;
} 
```

## Funciones
Responden a la pregunta: Como hacer mi codigo reutilizable, sin tener que repetir lineas de codigo y que quede más organizado?

```js
function solicitarNombre(){
    let nombreIngresado = prompt("Ingresar nombre");
    alert("El nombre ingresado es " + nombreIngresado);
} 

solicitarNombre();
```

### Funciones: Anónimas - Flecha
- Funciones anónimas
  - Cuando quiero que una variable guarde la funcion hago una función anónima
  ```js
  const suma  = function (a, b) { return a + b };
  ```

- Funciones flecha
```js
const suma  = (a, b) => { return a + b }; 
const suma = (a, b) =>  a + b; // Si el resultado es inmediato no se necesita la palabra return
const multiplicarPor4 = (a) => a * 4;
const multiplicarPor4 = a => a * 4; // Si es un solo parametro no necesita parentesis
```

### Funciones: Scope de las variables
- Variables locales: Variables definidas dentro de funciones, bucles y condicionales:
```js
function sumar(primerNumero, segundoNumero) {
    let resultado = primerNumero + segundoNumero;
}
//No se puede acceder a la variable resultado fuera del bloque
console.log(resultado);
```

- Variables globales: Variables definidas al principio del codigo y que pueden ser accedidas en cualquier parte de él:
```js
let resultado = 0
function sumar(primerNumero, segundoNumero) {
    resultado = primerNumero + segundoNumero;
}
sumar(5,6);
//Se puede acceder a la variable resultado porque es global
console.log(resultado);\
```

## Objetos
Responden a la pregunta: Como juntar información que tiene relación, como tener funciones propias para operar sobre esa información?

- Propiedades: Como relacionar información de variables o juntarla, en una sola variable?
```js
const persona = { nombre: "Homero", edad: 39, calle: "Av. Siempreviva 742" }
```
- Metodos: Como utilizar esa información relacionada y operar sobre ella?
```js
const persona = { 
    nombre: "Homero",
    edad: 39,
    imprimirEnConsola: function() {
		    console.log("Homero");
    }
};

const persona = { 
    nombre: "Homero",
    edad: 39,
    imprimirEdad() {
		    console.log(this.edad);
    }
};
```
- Funcion constructora: Como crear objetos de forma programatica y realizando operaciones durante su construcción?
```js 
function Persona(nombre, edad, calle) {
    this.nombre = nombre;
    this.edad 	 = edad;
    this.calle  = calle;
}
const persona = new Persona("Homero", 39, "Av. Siempreviva 742");
```
- Clases: Como crear objetos pero de manera más sencilla y entendible?
```js
class Persona {
    constructor(nombre, edad, calle) {
        this.nombre = nombre;
        this.edad   = edad;
        this.calle  = calle;
    }
    
    hablar(){
        console.log("HOLA SOY "+ this.nombre);
    }
}
const persona = new Persona("Homero", 39, "Av. Siempreviva 742");
persona.hablar();
```


## Arrays
Responden a la pregunta: Como hacer una lista de variables, por ejemplo, una lista de clientes o una lista de libros?

- Cómo acceder a un elemento de una array?: 
```js
const numeros = [1,2,3,4,5];
let resultado1  = numeros[0] + numeros[2]; // 1 + 3 = 4;
```

- Cómo saber el tamaño de un array?:  
```js
const numeros = [1,2,3,4,5];
numeros.length
```

- Cómo recorrer un array?: 
```js
const numeros = [1, 2, 3, 4, 5];
for (let index = 0; index < numeros.length; index++) {
    alert(numeros[index]);
}
```

- Cómo convertir un array en un string:  
```js
const miArray = ["marca", 3 ,"palabra"];
console.log(miArray.toString()); //imprime "marca,3,palabra"
```

- Cómo unir varios arrays?:  
```js
const miArray = ["ford", 45];
const otroArray = ["hola", 22, "mundo"];
const nuevoArray = miArray.concat(otroArray);
```

- Cómo obtener solo un pedazo del array?:  
```js
const nombres = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];
const masculinos = nombres.slice(1, 3); // Nuevo array desde la posición 1 a 3-1.
```

- Cómo encontrar un elemento en el array?:  
```js
const numeros    = [1, 2, 3, 4, 5];
//La función parámetro generalmente es una función flecha sin cuerpo.
const encontrado = numeros.find(elemento => elemento > 3); //Encuentra 4

const nombres     = ["Ana", "Ema", "Juan"];
const encontrado2 = nombres.find(elemento => elemento === "Ema"); //Encuentra "Ema"
```

- Cómo seleccionar elementos de un array basado en una condición?: 
```js
const numeros = [1, 2, 3, 4, 5];
const filtro1 = numeros.filter(elemento => elemento > 3); //Encuentra [4,5]
``` 

- Cómo convertir cada elemento de un array según alguna transformación?:  
```js
const numeros  = [1, 2, 3, 4, 5];
const porDos   = numeros.map(x => x * 2);   // porDos = [2, 4, 6, 8, 10]
```
