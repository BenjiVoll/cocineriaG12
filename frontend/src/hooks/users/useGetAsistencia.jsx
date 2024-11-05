import { useState, useEffect } from 'react';
import { getAsistencia } from '@services/asistencia.service.js';

const useGetAsistencia = () => {
    const [asistencia, setAsistencia] = useState([]);

    const fetchAsistencia = async () => {
        try {
            const response = await getAsistencia(); // Asegúrate de que esta función esté definida correctamente
            const formattedData = response.map(item => ({
                nombreCompleto: item.nombreCompleto,
                fecha: item.fecha,
                estado: item.estado,
                createdAt: item.createdAt
            }));
            setAsistencia(formattedData);
        } catch (error) {
            console.error("Error al obtener la asistencia: ", error);
        }
    };

    useEffect(() => {
        fetchAsistencia();
    }, []);

    return { asistencia, fetchAsistencia, setAsistencia };
};

export default useGetAsistencia;
