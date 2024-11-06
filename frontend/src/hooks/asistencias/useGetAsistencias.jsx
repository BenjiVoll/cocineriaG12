import { useState, useEffect } from 'react';
import { getAsistencias } from '@services/asistencia.service.js'; 
import { startCase } from 'lodash'; 
import { format as formatTempo } from '@formkit/tempo'; 

const useGetAsistencias = () => {
    const [asistencias, setAsistencias] = useState([]);

    const fetchAsistencias = async () => {
        try {
            const response = await getAsistencias();
            const formattedData = response.map(asistencia => ({
                id: asistencia.id,
                estado: startCase(asistencia.estado), // Cadena formateada que indica el estado de la asistencia (e.g., "Presente", "Ausente Justificado").
                justificativo: asistencia.justificativo || null, // Justificativo como cadena o `null` si no aplica.
                fecha: formatTempo(asistencia.fecha, 'YYYY-MM-DD'), // Fecha formateada en formato ISO.
                personal_id: asistencia.personal_id // Número o cadena que representa la identificación del personal asociado.
            }));
            setAsistencias(formattedData); // Uso de setAsistencias, no setAasistencias.
        } catch (error) {
            console.error("Error al obtener las asistencias: ", error);
        }
    };

    useEffect(() => {
        fetchAsistencias();
    }, []);

    return { asistencias, fetchAsistencias, setAsistencias };
};

export default useGetAsistencias;
