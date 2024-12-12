import { useState, useEffect } from 'react';
import { getPersonals, addPersonal, editPersonal, deletePersonal } from '@services/personal.service.js';

const useGetPersonals = () => {
    const [personals, setPersonals] = useState([]);

    const fetchPersonals = async () => {
        try {
            const response = await getPersonals();
            const formattedData = response.map(personal => ({
                id: personal.id,
                nombreCompleto: personal.nombreCompleto,
                telefono: personal.telefono,
                fechaIncorporacion: personal.fechaIncorporacion,
                cargo: personal.cargo,
                creado: personal.createdAt,
                actualizado: personal.updatedAt
            }));
            setPersonals(formattedData);
            console.log("Personales obtenidos:", formattedData);
        } catch (error) {
            console.error("Error al obtener personal:", error);
        }
    };

    useEffect(() => {
        fetchPersonals();
    }, []);

    const handleAddPersonal = async (newPersonalData) => {
        try {
            console.log("Datos recibidos en handleAddPersonal (useGetPersonals):", newPersonalData);
            console.log("Tipo de newPersonalData:", typeof newPersonalData);
            console.log("Datos antes de llamar a addPersonal (JSON):", JSON.stringify(newPersonalData));
            await addPersonal(newPersonalData);
            await fetchPersonals();
        } catch (error) {
            console.error('Error al agregar personal:', error);
        }
    };

    const handleEditPersonal = async (updatedData, id) => {
        try {
            console.log("Datos recibidos en handleEditPersonal (useGetPersonals):", updatedData);
            await editPersonal(updatedData, id);
            await fetchPersonals();
        } catch (error) {
            console.error('Error al editar personal:', error);
        }
    };

    const handleDeletePersonal = async (id) => {
        try {
            console.log("ID recibido en handleDeletePersonal (useGetPersonals):", id);
            await deletePersonal(id);
            await fetchPersonals();
        } catch (error) {
            console.error('Error al eliminar personal:', error);
        }
    };

    return { personals, fetchPersonals, setPersonals, handleAddPersonal, handleEditPersonal, handleDeletePersonal };
};

export default useGetPersonals;
