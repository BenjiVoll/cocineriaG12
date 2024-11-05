import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatOrderData(order) {
    return {
        id: order.id,
        productos: order.productos?.map(producto => ({
            producto: startCase(producto.producto || ""),
            cantidad: producto.cantidad || 0
        })) || [],
        estado: order.estado ? startCase(order.estado) : "",
        precioTotal: order.precioTotal ? order.precioTotal: "0.00",
        metodoPago: order.metodoPago ? startCase(order.metodoPago) : "",
        fechaEntrega: order.fechaEntrega ? formatTempo(order.fechaEntrega, "DD-MM-YYYY") : null
    };
}
