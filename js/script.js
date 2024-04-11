// Declaro el carrito
let carrito = [];

// Funcionalidad del menu principal
let menuPpal = parseInt(prompt("Ingrese una opción: \n1. Agregar producto \n2. Mostrar carrito \n3. Calcular subtotal \n4. Ir a pagar  \n0. Abandonar carrito"));

let total = 0;
const iva = 0.21;
const descEfectivo = 0.2;
const tresCuotas = 0.1;
const seisCuotas = 0.2;

while (menuPpal != 0) {    
    switch (menuPpal) {
        case 1:
            let menuProducto = parseInt(prompt("Seleccione el número del producto que desea agregar al carrito:\n1.  " + productosCargados[0].nombre + "  $" + productosCargados[0].precio + ".-\n2.  " + productosCargados[1].nombre + "  $" + productosCargados[1].precio + ".-\n3.  " + productosCargados[2].nombre + "  $" + productosCargados[2].precio + ".-\n4.  " + productosCargados[3].nombre + "  $" + productosCargados[3].precio + ".-\n5.  " + productosCargados[4].nombre + "  $" + productosCargados[4].precio + ".-\n6.  " + productosCargados[5].nombre + "  $" + productosCargados[5].precio + ".-\n0. Volver atrás"));
            while (menuProducto !== 0) {                
                if (menuProducto >= 1 && menuProducto <= 6) {
                    agregarProducto(productosCargados[menuProducto - 1]);
                    break;
                } else if (menuProducto === 0) {
                    break;
                } else {
                    alert("Número de producto no válido.");
                }
            }
            break;
    
        case 2:
            mostrarCarrito();
            break;

        case 3:
            alert("🛒 Total sin impuestos: $" + calcularSubtotal() + "\nPara ver el valor final anda a Ir a pagar");
            break;
        
        case 4:
            let medioPago = parseInt(prompt("Total sin impuestos: $" + calcularSubtotal() + "\n💵 Elegí el medio de pago:\n1. Efectivo o transferencia (20% de descuento)\n2. Débito \n3. Crédito (1, 3 o 6 cuotas fijas)"));
        
            // Agrega impuestos y descuentos
            if (medioPago == 1) {
                alert("Total a pagar: $" + subtotal(0, descEfectivo) + "*\n*Descuento aplicado");
            } else if (medioPago == 2) {
                alert("Total a pagar: $" + subtotal(iva, 0) + "*\n*IVA aplicado");
            } else if (medioPago == 3) {
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
    menuPpal = parseInt(prompt("Ingrese una opción: \n1. Agregar producto \n2. Mostrar carrito \n3. Calcular subtotal \n4. Ir a pagar  \n0. Abandonar carrito"));
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
    });
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
}







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