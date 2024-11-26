import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export const formatIngredienteData = (ingrediente) => {
    return {
        id: ingrediente.id,
        nombre: startCase(ingrediente.nombre),
        cantidad: ingrediente.cantidad,
        fechaCreacion: ingrediente.fechaCreacion ? formatTempo(ingrediente.fechaCreacion, 'DD-MM-YYYY') : null,
        fechaActualizacion: ingrediente.fechaActualizacion ? formatTempo(ingrediente.fechaActualizacion, 'DD-MM-YYYY HH:mm:ss') : null
    };
};