import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatOrderData(order) {
    return {
        ...order,
        clienteId: order.clienteId,
        productos: order.productos.map(producto => ({
            ...producto,
            producto: startCase(producto.producto),
            cantidad: producto.cantidad
        })),
        precioTotal: order.precioTotal.toFixed(2),
        estado: startCase(order.estado),
        metodoPago: startCase(order.metodoPago),
        fechaEntrega: formatTempo(order.fechaEntrega, "DD-MM-YYYY"),
        createdAt: formatTempo(order.createdAt, "DD-MM-YYYY HH:mm:ss"),
        updatedAt: formatTempo(order.updatedAt, "DD-MM-YYYY HH:mm:ss")
    };
}

export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

export function formatPostUpdate(order) {
    return {
        clienteId: order.clienteId,
        productos: order.productos.map(producto => ({
            ...producto,
            producto: startCase(producto.producto),
            cantidad: producto.cantidad
        })),
        precioTotal: order.precioTotal.toFixed(2),
        estado: startCase(order.estado),
        metodoPago: startCase(order.metodoPago),
        fechaEntrega: formatTempo(order.fechaEntrega, "DD-MM-YYYY"),
        createdAt: formatTempo(order.createdAt, "DD-MM-YYYY HH:mm:ss"),
        updatedAt: formatTempo(order.updatedAt, "DD-MM-YYYY HH:mm:ss")
    };
}
