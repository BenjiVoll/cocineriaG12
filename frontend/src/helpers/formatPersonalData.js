import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatPersonalData(personal) {
    return {
        id: personal.id,
        nombreCompleto: personal.nombreCompleto,
        telefono: personal.telefono,
        fechaIncorporacion: personal.fechaIncorporacion ? formatTempo(personal.fechaIncorporacion, 'YYYY-MM-DD') : null,
        cargo: personal.cargo ? personal.cargo.toLowerCase() : "", 
        createdAt: personal.createdAt ? formatTempo(personal.createdAt, "YYYY-MM-DD HH:mm:ss") : null,
        updatedAt: personal.updatedAt ? formatTempo(personal.updatedAt, "YYYY-MM-DD HH:mm:ss") : null
    };
}
