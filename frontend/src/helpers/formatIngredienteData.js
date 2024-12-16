import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatIngredienteData(ingrediente) {
    return {
        ...ingrediente,
        nombre: startCase(ingrediente.nombre),
        cantidad: ingrediente.cantidad,
        createdAt: formatTempo(ingrediente.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(ingrediente.updatedAt, 'DD-MM-YYYY HH:mm:ss')
    };
}

export function formatIngredientePostUpdate(ingrediente) {
    return {
        id: ingrediente.id,
        nombre: startCase(ingrediente.nombre),
        cantidad: ingrediente.cantidad,
        createdAt: formatTempo(ingrediente.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(ingrediente.updatedAt, 'DD-MM-YYYY HH:mm:ss')
    };
}