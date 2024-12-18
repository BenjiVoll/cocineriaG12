import { useState, useEffect, useRef } from 'react';
import { getPersonals, addPersonal, editPersonal, deletePersonal } from '@services/personal.service.js';

const useGetPersonals = () => {
    const [personals, setPersonals] = useState([]);
    const fetchInterval = useRef(null); 

    const fetchPersonals = async () => {
        try {
            const response = await getPersonals();
            const formattedData = response.map(personal => ({
                id: personal.id,
                nombreCompleto: personal.nombreCompleto,
                telefono: personal.telefono,
                fechaIncorporacion: personal.fechaIncorporacion,
                cargo: personal.cargo,
                asistencia: personal.asistencias?.[0]?.estado || 'Sin marcar', 
                creado: personal.createdAt,
                actualizado: personal.updatedAt
            }));
            setPersonals(formattedData);
        } catch (error) {
            setError("Error al obtener personal:", error);
        }
    };

    useEffect(() => {
        fetchPersonals();
        if (!fetchInterval.current) {
            fetchInterval.current = setInterval(fetchPersonals, 60000); 
        }
        return () => {
            if (fetchInterval.current) {
                clearInterval(fetchInterval.current);
            }
        };
    }, []);

    const handleAddPersonal = async (newPersonalData) => {
        try {
            await addPersonal(newPersonalData);
            await fetchPersonals();
        } catch (error) {
            setError('Error al agregar personal:', error);
        }
    };

    const handleEditPersonal = async (updatedData, id) => {
        try {
            await editPersonal(updatedData, id);
            await fetchPersonals();
        } catch (error) {
            setError('Error al editar personal:', error);
        }
    };

    const handleDeletePersonal = async (id) => {
        try {
            await deletePersonal(id);
            await fetchPersonals();
        } catch (error) {
            setError('Error al eliminar personal:', error);
        }
    };

    return { personals, fetchPersonals, setPersonals, handleAddPersonal, handleEditPersonal, handleDeletePersonal };
};

export default useGetPersonals;
