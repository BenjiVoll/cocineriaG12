import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatOrderData(order) {
    return {
        ...order,
        id: order.id,
        productos: order.productos,
        precioTotal: order.precioTotal,
        estado: startCase(order.estado),
        metodoPago: startCase(order.metodoPago),
        createdAt: order.createdAt ? formatTempo(order.createdAt, "DD-MM-YYYY HH:mm:ss") : null,
        updatedAt: order.updatedAt ? formatTempo(order.updatedAt, "DD-MM-YYYY HH:mm:ss") : null
    };
}
