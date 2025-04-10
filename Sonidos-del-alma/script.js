let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Recupera el carrito del localStorage
let total = parseFloat(localStorage.getItem("total")) || 0; // Recupera el total del localStorage

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    total += precio;
    actualizarCarrito();
    guardarCarrito(); // Guardar el carrito y total en localStorage
}

// Función para eliminar productos del carrito
function eliminar(indice) {
    total -= carrito[indice].precio * carrito[indice].cantidad;
    carrito.splice(indice, 1);
    actualizarCarrito();
    guardarCarrito(); // Guardar el carrito y total en localStorage
}

// Función para incrementar la cantidad de un producto
function incrementarCantidad(indice) {
    carrito[indice].cantidad++;
    total += carrito[indice].precio;
    actualizarCarrito();
    guardarCarrito(); // Guardar el carrito y total en localStorage
}

// Función para decrementar la cantidad de un producto
function decrementarCantidad(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
        total -= carrito[indice].precio;
        actualizarCarrito();
        guardarCarrito(); // Guardar el carrito y total en localStorage
    }
}

// Función para mostrar los productos en el carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById("carrito-lista");
    listaCarrito.innerHTML = ''; // Limpiar la lista antes de actualizar

    carrito.forEach((item, index) => {
        const itemHTML = `
            <div class='carrito-item'>
                <p>${item.nombre} - $${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}</p>
                <button onclick='decrementarCantidad(${index})'>-</button>
                <span>${item.cantidad}</span>
                <button onclick='incrementarCantidad(${index})'>+</button>
                <button onclick='eliminar(${index})'>x</button>
            </div>
        `;
        listaCarrito.innerHTML += itemHTML;
    });

    const totalContainer = document.getElementById("total");
    totalContainer.textContent = `$${total}`;
}

// Función para guardar el carrito y el total en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar carrito en localStorage
    localStorage.setItem("total", total); // Guardar total en localStorage
}

// Función para filtrar productos por categoría
function mostrarProductos(categoria = '') {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        if (categoria === '' || producto.getAttribute('data-categoria') === categoria) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

// Función para simular el pago
function irAlPago() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de pagar.');
    } else {
        // Redirigir a la página de pago si la tienes
        window.location.href = "pago.html"; // Cambia esto por la URL de la página de pago real
    }
}

// Función para alternar la visibilidad del carrito y hacer el "slide"
function toggleCarrito() {
    const carritoContenido = document.getElementById("carrito-contenido");
    const productosContainer = document.getElementById("productos");
    if (carritoContenido.style.display === "none" || carritoContenido.style.display === "") {
        carritoContenido.style.display = "block";
        carritoContenido.classList.add('expandido');
        productosContainer.classList.add('desenfocar');
    } else {
        carritoContenido.style.display = "none";
        carritoContenido.classList.remove('expandido');
        productosContainer.classList.remove('desenfocar');
    }
}

// Al cargar la página, asegurarse de que el carrito se haya cargado correctamente
document.addEventListener('DOMContentLoaded', actualizarCarrito);
