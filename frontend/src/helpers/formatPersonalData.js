import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatPersonalData(personal) {
    return {
        id: personal.id,
        nombreCompleto: personal.nombreCompleto,
        telefono: personal.telefono,
        fechaIncorporacion: personal.fechaIncorporacion ? formatTempo(personal.fechaIncorporacion, 'DD-MM-YYYY') : null, 
        cargo: startCase(personal.cargo), 
        createdAt: personal.createdAt ? formatTempo(personal.createdAt, "DD-MM-YYYY HH:mm:ss") : null, 
        updatedAt: personal.updatedAt ? formatTempo(personal.updatedAt, "DD-MM-YYYY HH:mm:ss") : null 
    };
}
