let carrito = [];

// Carga productos desde JSON
function productosCargados() {
    fetch('../js/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos de productos');
            }
            return response.json();
        })
        .then(productos => {
            mostrarTodo(productos);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

productosCargados();

// Carga destacados desde JSON
function productosDestacadosCargados() {
    fetch('./js/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos de productos');
            }
            return response.json();
        })
        .then(productos => {
            const productosDestacados = productos.filter(prod => prod.destacado === "SI");
            mostrarProductosDestacados(productosDestacados);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

productosDestacadosCargados();

// Vaciar el carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará todos los productos del carrito. ¿Deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarCarrito();
            Swal.fire('¡Carrito vaciado!', '', 'success');
        }
    });
});

// Actualizar el carrito en el almacenamiento local
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
    actualizarTotalCarrito();
}

// Evento que se dispara cuando la página se carga completamente
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        mostrarProductosEnCarrito();
        actualizarTotalCarrito();
    }
});

// Eliminar producto del carrito
document.getElementById('productosAgregados').addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar')) {
        const id = parseInt(event.target.dataset.id);
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
            actualizarCarrito();
            Swal.fire('¡Producto eliminado!', '', 'success');
        }
    } else if (event.target.classList.contains('aumentar-cantidad')) {
        const id = parseInt(event.target.dataset.id);
        const producto = carrito.find(item => item.id === id);
        if (producto) {
            producto.cantidad += 1;
            actualizarCarrito();
        }
    } else if (event.target.classList.contains('disminuir-cantidad')) {
        const id = parseInt(event.target.dataset.id);
        const producto = carrito.find(item => item.id === id);
        if (producto && producto.cantidad > 1) {
            producto.cantidad -= 1;
            actualizarCarrito();
        }
    }
});

// Mostrar los productos en el carrito
function mostrarProductosEnCarrito() {
    const productosAgregados = document.getElementById('productosAgregados');
    productosAgregados.innerHTML = '';
    let totalCarrito = 0;
    carrito.forEach(producto => {
        totalCarrito += producto.precio * producto.cantidad;
        productosAgregados.innerHTML += `
        <tr class="productos_agregados">
            <td><img src="${producto.img1}" alt="${producto.nombre}"></td>
            <td>
                <div>${producto.nombre}</div>
                <div>
                    <button class="disminuir-cantidad" data-id="${producto.id}">-</button>
                    <span>${producto.cantidad}</span> <!-- Cantidad -->
                    <button class="aumentar-cantidad" data-id="${producto.id}">+</button>
                </div>
            </td>
            <td>
                <span>$${producto.precio * producto.cantidad}</span>
                <button class="eliminar eliminar_producto" data-id="${producto.id}">Eliminar</button>
            </td>
        </tr>`;
    });
    document.getElementById('totalCarrito').textContent = totalCarrito;
}

// Evento para finalizar la compra
document.getElementById('finalizarCompra').addEventListener('click', () => {
    Swal.fire({
        title: '¡Compra exitosa!',
        text: '¡Gracias por tu compra!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        carrito = [];
        actualizarCarrito();
    });
});


// Actualizar el total del carrito
function actualizarTotalCarrito() {
    const totalCarrito = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    document.getElementById('totalCarrito').textContent = totalCarrito;
}

// Agregar productos al carrito
function agregarProductos(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    actualizarCarrito();
}

// Mostrar todos los productos
function mostrarTodo(listaProductos) {
    const galeriaProductos = document.getElementById('seccionProductos');
    galeriaProductos.innerHTML = ''; 
    listaProductos.forEach(prod => {
        galeriaProductos.innerHTML += `
        <div class="card card_box">
            <img src="${prod.img1}" class="card-img-top imagen_card" alt="${prod.nombre}">
            <div class="card-body">
                <h3 class="card-title">${prod.nombre}</h3>
                <p class="card-text formato">${prod.formato}</p>
                <p class="card-text">Precio $${prod.precio}</p>
            </div>
            <button class="compra" data-id="${prod.id}">Comprar</button>
        </div>`;
    });

    document.querySelectorAll('.compra').forEach(boton => {
        boton.addEventListener('click', () => {
            const productoSeleccionado = listaProductos.find(prod => prod.id === parseInt(boton.dataset.id));
            agregarProductos(productoSeleccionado);
        });
    });
}


//Mostrar productos destacados
function mostrarProductosDestacados(listaProductos) {
    const productosDestacados = listaProductos.filter(prod => prod.destacado === "SI");

    const galeriaProductos = document.getElementById('seccionDestacados');
    galeriaProductos.innerHTML = '';
    
    productosDestacados.forEach(prod => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('card', 'card_box');
        productoCard.innerHTML = `
            <img src="${prod.img1}" class="card-img-top imagen_card" alt="${prod.nombre}">
            <div class="card-body">
                <h3 class="card-title">${prod.nombre}</h3>
                <p class="card-text formato">${prod.formato}</p>
                <p class="card-text">Precio $${prod.precio}</p>
            </div>
            <button class="compra" data-id="${prod.id}">Comprar</button>
        `;
        galeriaProductos.appendChild(productoCard);

        // Agregar evento de click al botón "Comprar"
        const botonComprar = productoCard.querySelector('.compra');
        botonComprar.addEventListener('click', () => {
            const productoSeleccionado = listaProductos.find(p => p.id === parseInt(botonComprar.dataset.id));
            agregarProductos(productoSeleccionado);
        });
    });
}