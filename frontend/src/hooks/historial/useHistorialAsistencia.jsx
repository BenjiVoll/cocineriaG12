import { useState, useEffect } from 'react';

const useHistorialAsistencia = () => {
    const [historial, setHistorial] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchHistorial = async () => {
        setLoading(true); 
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/asistencia`);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            setHistorial(data); 
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    const filterByName = (name) => {
        const filtered = historial.filter(record => record.personal.nombreCompleto.toLowerCase().includes(name.toLowerCase()));
        setHistorial(filtered);
    };

    const subirJustificativo = async (personalId, asistenciaId, file) => {
        const formData = new FormData();
        formData.append('justificativo', file);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/historial/${personalId}/asistencia/${asistenciaId}/justificativo`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            await fetchHistorial(); 
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchHistorial(); 
    }, []);

    return { historial, fetchHistorial, filterByName, subirJustificativo, error, loading };
};

export default useHistorialAsistencia;
