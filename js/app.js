// Variables
const carrito = document.querySelector('#carrito');
const listaTienda = document.querySelector('#lista-tienda');
const contenedorCarrito = document.querySelector('#lista-producto tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners

// Dispara cuando se presiona "Agregar Carrito"
listaTienda.addEventListener('click', agregarProducto);

// Cuando se elimina un curso del carrito
carrito.addEventListener('click', eliminarProducto);

// Al Vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
	articulosCarrito = [];
	vaciarCarrito();
});

document.addEventListener('DOMContentLoaded', () => {
	articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

	carritoHTML();
});

// Funciones
// Función que añade el curso al carrito
function agregarProducto(e) {
	e.preventDefault();

	// Delegation para agregar-carrito
	if (e.target.classList.contains('agregar-carrito')) {
		const productoSeleccionado = e.target.parentElement.parentElement;

		// Enviamos el curso seleccionado para tomar sus datos
		leerDatosProducto(productoSeleccionado);
	}
}

// Lee los datos del curso
function leerDatosProducto(productoSeleccionado) {
	const infoProducto = {
		imagen: productoSeleccionado.querySelector('img').src,
		titulo: productoSeleccionado.querySelector('h4').textContent,
		precio: productoSeleccionado.querySelector('.precio span').textContent,
		id: productoSeleccionado.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};
	const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);

	if (existe) {
		const productos = articulosCarrito.map((producto) => {
			if (producto.id === infoProducto.id) {
				producto.cantidad++;
				return producto;
			} else {
				return producto;
			}
		});
		articulosCarrito = [...productos];
	} else {
		articulosCarrito = [...articulosCarrito, infoProducto];
	}

	/*articulosCarrito = [...articulosCarrito, infoProducto]; poner antes de que se vakude si hay mas ed un producto*/

	// console.log(articulosCarrito)
	carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarProducto(e) {
	e.preventDefault();
	if (e.target.classList.contains('borrar-producto')) {
		// e.target.parentElement.parentElement.remove();
		const productoId = e.target.getAttribute('data-id');

		// Eliminar del arreglo del carrito
		articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoId);

		carritoHTML();
	}
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {
	//limpia el html
	vaciarCarrito();

	//recorre el carrito y genera el html
	articulosCarrito.forEach((producto) => {
		const row = document.createElement('tr');
		row.innerHTML = `
               <td>  
                    <img src="${producto.imagen}" width=100>
               </td>
               <td>${producto.titulo}</td>
               <td>${producto.precio}</td>
               <td>${producto.cantidad} </td>
               <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
               </td>
          `;
		contenedorCarrito.appendChild(row);
	});

	//sincronizar web Storage
	guardarStorage();
}

function guardarStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
	// forma lenta
	contenedorCarrito.innerHTML = '';
	// forma rapida (recomendada)
	// while (contenedorCarrito.firstChild) {
	// 	contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	// }
}
