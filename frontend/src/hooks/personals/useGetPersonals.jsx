import { useState, useEffect } from 'react';
import { getPersonals } from '@services/personal.service.js'; // Asegúrate de tener este servicio

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
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchPersonals();
    }, []);



    return { personals, fetchPersonals, setPersonals };
};

export default useGetPersonals;
