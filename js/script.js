let prodFisico = parseInt(prompt('Agregar producto al carrito:\n1. Agenda diaria _____ $20.000.-\n2. Agenda semanal _____ $15.000.-\n3. Agenda perpetua _____ $15.000.-\n4. Cuaderno de notas _____ $10.000.-\n0. Checkout'));

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
}
