import { useState } from 'react';
import { registerAsistencia } from '@services/asistencia.service.js';

const useAsistencia = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAsistencia = async (personalId, estado, justificativo = null) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await registerAsistencia({ personalId, estado, justificativo });
            console.log("Respuesta del servidor (Asistencia):", response);
        } catch (err) {
            console.error("Error al registrar asistencia:", err);
            setError(err.message || 'Error desconocido');
        } finally {
            setIsLoading(false);
        }
    };

    return { handleAsistencia, isLoading, error };
};

export default useAsistencia;
