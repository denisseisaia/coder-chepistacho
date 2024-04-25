console.table(productosCargados);
let carrito = [];

// Evento que se dispara cuando la página se carga completamente
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        mostrarProductosEnCarrito();
        actualizarTotalCarrito();
    }
});

// Vaciar carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarritoEnStorage();
    mostrarProductosEnCarrito();
    actualizarTotalCarrito();
});

// Eliminar producto del carrito
document.getElementById('productosAgregados').addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar')) {
        const id = parseInt(event.target.dataset.id);
        carrito = carrito.filter(producto => producto.id !== id);
        actualizarCarritoEnStorage();
        mostrarProductosEnCarrito();
        actualizarTotalCarrito();
    }
});

// Productos en carrito
function mostrarProductosEnCarrito() {
    const productosAgregados = document.getElementById('productosAgregados');
    productosAgregados.innerHTML = '';
    let totalCarrito = 0;
    carrito.forEach(producto => {
        totalCarrito += producto.precio;
        productosAgregados.innerHTML += `
        <tr class="productos_agregados">
            <td><img src="${producto.img1}" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td><p>$${producto.precio}</p></td>
            <td><button class="eliminar eliminar_producto" data-id="${producto.id}">Eliminar</button></td>
        </tr>`;
    });
    document.getElementById('totalCarrito').textContent = totalCarrito;
}

// Actualizar el carrito en el Storage
function actualizarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//Agregar productos
function agregarProductos(producto) {
    carrito.push(producto);
    actualizarCarritoEnStorage();
    mostrarProductosEnCarrito();
}

//Actualizar carrito
function actualizarTotalCarrito() {
    const totalCarrito = carrito.reduce((total, producto) => total + producto.precio, 0);
    document.getElementById('totalCarrito').textContent = totalCarrito;
}

//Mostrar todos los productos
function mostrarTodo(listaProductos) {
    const galeriaProductos = document.getElementById('seccionProductos');
    listaProductos.forEach(prod => {
        galeriaProductos.innerHTML += `
        <div class="card card_box">
            <img src="${prod.img1}" class="card-img-top imagen_card" alt="${prod.nombre}">
            <div class="card-body">
                <h3 class="card-title">${prod.nombre}</h3>
                <p class="card-text formato">${prod.formato}</p>
                <p class="card-text">Precio $${prod.precio}</p>
            </div>
            <button class="btn btn-primary compra" data-id="${prod.id}">Comprar</button>
        </div>`;
    });

    document.querySelectorAll('.compra').forEach(boton => {
        boton.addEventListener('click', () => {
            const productoSeleccionado = listaProductos.find(prod => prod.id === parseInt(boton.dataset.id));
            agregarProductos(productoSeleccionado);
        });
    });
}

mostrarTodo(productosCargados);


//SEGUNDA PREENTREGA

/*// Declaro el carrito
let carrito = [];

// Funcionalidad del menu principal
let menuPrincipal;

let total = 0;
const iva = 0.21;
const descEfectivo = 0.2;
const tresCuotas = 0.1;
const seisCuotas = 0.2;

while (menuPrincipal !== 0) {
    menuPrincipal = parseInt(prompt("Ingrese una opción: \n1. Agregar producto \n2. Mostrar carrito \n3. Ir a pagar  \n0. Abandonar carrito"));

    switch (menuPrincipal) {
        case 1:
            //Muestra menu de productos para agregar
            let menuProducto = parseInt(prompt(mostrarProductos()));
            while (menuProducto !== 0) {
                const seleccion = productosCargados.find(producto => producto.id === menuProducto); //Busca entre los id del array
                if (seleccion) {
                    agregarProducto(seleccion);
                } else {
                    alert("Producto no encontrado.");
                }
                menuProducto = parseInt(prompt(mostrarProductos()));
            }
            break;

        case 2:
            //Muestra el carrito hasta el momento
            mostrarCarrito();
            break;

        case 3:
            //Muestra el subtotal y los medios de pago
            let medioPago = parseInt(prompt("Total sin impuestos: $" + calcularSubtotal() + "\n💵 Elegí el medio de pago:\n1. Efectivo o transferencia (20% de descuento)\n2. Débito \n3. Crédito (1, 3 o 6 cuotas fijas)"));

            // Agrega impuestos y descuentos
            if (medioPago == 1) {
                alert("Total a pagar: $" + subtotal(0, descEfectivo) + "*\n*Descuento aplicado");
            } else if (medioPago == 2) {
                alert("Total a pagar: $" + subtotal(iva, 0) + "*\n*IVA aplicado");
            } else if (medioPago == 3) {
                //Calcula cuotas
                let cuotasPago = parseInt(prompt("💳 Elegir cantidad de cuotas:\n1. 1 cuota (0% de recargo)\n2. 3 cuotas (10% de recargo)\n3. 6 cuotas (20% de recargo)"));
                if (cuotasPago == 1) {
                    alert("Total a pagar: $" + subtotal(iva, 0) + "*\n*IVA aplicado");
                } else if (cuotasPago == 2) {
                    alert("Total a pagar: $" + subtotal(iva + tresCuotas, 0) + "*\n*IVA y recargos aplicados");
                } else if (cuotasPago == 3) {
                    alert("Total a pagar: $" + subtotal(iva + seisCuotas, 0).toFixed(0) + "*\n*IVA y recargos aplicados");
                } else {
                    alert("Opción inválida");
                }
            } else {
                alert("Opción inválida");
            }
            break;

        case 0:
            alert("Abandonó el carrito");
            break;

        default:
            alert("Opción no válida.");
            break;
    }
}

// Mostrar lista de productos
function mostrarProductos() {
    let menu = "Seleccione el número del producto que desea agregar al carrito:\n";
    for (let i = 0; i < productosCargados.length; i++) {
        menu += `${i + 1}. ${productosCargados[i].nombre} $${productosCargados[i].precio}.\n`;
    }
    menu += "0. Volver atrás";
    return menu;
}

// Agregar un producto al carrito
function agregarProducto(producto) {
    carrito.push(producto);
    alert("🛒 Producto agregado al carrito:\n" + producto.nombre + " - $" + producto.precio);
}

// Mostrar el contenido del carrito
function mostrarCarrito() {
    let mensaje = "📦 Contenido del carrito:\n";
    carrito.forEach(producto => {
        mensaje += producto.nombre + " - $" + producto.precio + "\n";
        total += producto.precio;
    });

    mensaje += "\nSubtotal: $" + total.toFixed(2);
    alert(mensaje);
}

// Calcular el subtotal de la compra
function calcularSubtotal() {
    total = 0; 
    carrito.forEach(producto => {
        total += producto.precio;
    });
    return total;
}

// Calcular total con impuestos y descuentos
function subtotal(impuestos, descuentos) {
    let totalConImpuestos = total * (1 + impuestos);
    let totalConDescuentos;
    if (descuentos !== 0) {
        totalConDescuentos = totalConImpuestos * (1 - descuentos);
    } else {
        totalConDescuentos = totalConImpuestos;
    }
    return totalConDescuentos;
}/*



//PRIMER ENTREGA

/*let prodFisico = parseInt(prompt('Agregar producto al carrito:\n1. Agenda diaria _____ $20.000.-\n2. Agenda semanal _____ $15.000.-\n3. Agenda perpetua _____ $15.000.-\n4. Cuaderno de notas _____ $10.000.-\n0. Checkout'));

let total = 0;
const iva = 0.21;
const descEfectivo = 0.2;
const tresCuotas = 0.1;
const seisCuotas = 0.2;


while (prodFisico != 0) {
    switch (prodFisico) {
        case 1:
            total += 20000;
            alert('🛒 Agregaste Agenda diaria al carrito. Monto total: $' + total);
            break;
        case 2:
            total += 15000;
            alert('🛒 Agregaste Agenda semanal al carrito. Monto total: $' + total);
            break;
        case 3:
            total += 15000;
            alert('🛒 Agregaste Agenda perpetua al carrito. Monto total: $' + total);
            break;
        case 4:
            total += 10000;
            alert('🛒 Agregaste Cuaderno de notas al carrito. Monto total: $' + total);
            break;
        default:
            alert('Ese producto no está disponible');
            break;
    }

    prodFisico = parseInt(prompt('Agregar producto al carrito:\n1. Agenda diaria _____ $20.000.-\n2. Agenda semanal _____ $15.000.-\n3. Agenda perpetua _____ $15.000.-\n4. Cuaderno de notas _____ $10.000.-\n0. Checkout'));
}

let medioPago = prompt ('Total sin impuestos: $'+total+'\nElegí el medio de pago:\n1. Efectivo o transferencia (20% de descuento)\n2. Débito \n3. Crédito (1, 3 o 6 cuotas fijas)');

if (medioPago == 1){
    alert ('Total a pagar: $'+ subtotal(0,descEfectivo)+'*\n*Descuento aplicado');
}else if (medioPago == 2){
    alert ('Total a pagar: $'+ subtotal(iva,0)+'*\n*IVA aplicado');
}else if (medioPago == 3){
    let cuotasPago = parseInt(prompt ('Elegir cantidad de cuotas:\n1. 1 cuota (0% de recargo).\n2. 3 cuotas (10% de recargo).\n3. 6 cuotas (20% de recargo).'));
    if (cuotasPago == 1){
        alert ('Total a pagar: $'+ subtotal(iva,0)+'*\n*IVA aplicado');
    } else if (cuotasPago == 2){
        alert ('Total a pagar: $'+ subtotal(iva + tresCuotas,0)+'*\n*IVA y recargos aplicados');
    } else if (cuotasPago == 3){
        alert ('Total a pagar: $'+ subtotal(iva + seisCuotas,0).toFixed(0)+'*\n*IVA y recargos aplicados');
    }else{
        alert('Opción inválida');
    }
}else{
    alert('Opción inválida');
}

function subtotal(impuestos,descuentos){
    let totalConImpuestos = total * (1+impuestos);
    let totalConDescuentos;
    if (descuentos != 0){
        totalConDescuentos = totalConImpuestos * (1-descuentos);
    }else {
        totalConDescuentos = totalConImpuestos;
    }
    return totalConDescuentos;
}*/