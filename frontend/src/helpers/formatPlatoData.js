import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatPlatoData(plato) {
    return {
        id: plato.id,
        nombre: startCase(plato.nombre),
        descripcion: plato.descripcion,
        precio: plato.precio,
        disponible: plato.disponible,
        ingredientes: Array.isArray(plato.ingredientes) ? plato.ingredientes : [],
        createdAt: formatTempo(plato.createdAt, "DD-MM-YYYY"),
    };
}