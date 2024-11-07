import { useState, useEffect } from 'react';
import { getPersonals } from '@services/personal.service.js';

const usePersonals = () => {
    const [personals, setPersonals] = useState([]);

    const fetchPersonals = async () => {
        try {
            const response = await getPersonals();
            const formattedData = response.map(personal => ({
                id: personal.id,
                nombrecompleto: personal.nombreCompleto,
                telefono: personal.estado,
                fechaincorporacion: personal.fechaIncorporacion,
                cargo: personal.cargo,
                creado: personal.createdAt,
                actualizado: personal.updatedAt
            }));
            dataLogged(formattedData);
            setPersonals(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchPersonals();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('usuario'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].rut === rut) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { personals, fetchPersonals, setPersonals };
};

export default usePersonals;