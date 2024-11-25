import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatPlatoData(plato) {
    return {
        id: plato.id,
        nombre: startCase(plato.nombre),
        descripcion: plato.descripcion,
        precio: plato.precio,
        fechaCreacion: plato.fechaCreacion ? formatTempo(plato.fechaCreacion, 'DD-MM-YYYY') : null,
        fechaActualizacion: plato.fechaActualizacion ? formatTempo(plato.fechaActualizacion, 'DD-MM-YYYY HH:mm:ss') : null
    };
}