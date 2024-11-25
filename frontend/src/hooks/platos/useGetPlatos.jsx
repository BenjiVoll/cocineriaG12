import { useState, useEffect } from 'react';
import { getPlatos } from '@services/plato.service.js';

const useGetPlatos = () => {
    const [platos, setPlatos] = useState([]);

    const fetchPlatos = async () => {
        try {
            const response = await getPlatos();
            const formattedData = response.map(plato => ({
                nombre: plato.nombre,
                descripcion: plato.descripcion,
                precio: plato.precio,
                createdAt: plato.createdAt
            }));
            dataLogged(formattedData);
            setPlatos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchPlatos();
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

    return { platos, fetchPlatos, setPlatos };
};

export default useGetPlatos;
