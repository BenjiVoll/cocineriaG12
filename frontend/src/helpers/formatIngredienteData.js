import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export const formatIngredienteData = (ingrediente) => {
    return {
        id: ingrediente.id,
        nombre: startCase(ingrediente.nombre),
        cantidad: ingrediente.cantidad,
        createdAt: formatTempo(ingrediente.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(ingrediente.updatedAt, 'DD-MM-YYYY HH:mm:ss')
    };
};