import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatAsistenciaData(asistencia) {
    return {
        id: asistencia.id, 
        estado: startCase(asistencia.estado), 
        justificativo: asistencia.justificativo || null, 
        fecha: formatTempo(asistencia.fecha, 'YYYY-MM-DD'), 
        personal_id: asistencia.personal_id
    };
}
