import { useState, useEffect } from 'react';
import { getPlatos } from '@services/plato.service.js';

const useGetPlatos = () => {
    const [platos, setPlatos] = useState([]);

    const fetchPlatos = async () => {
        try {
            const response = await getPlatos();
            console.log("Platos recibidos:", response);
    
            const formattedData = response.map(plato => ({
                id: plato.id,
                nombre: plato.nombre,
                descripcion: plato.descripcion,
                precio: plato.precio,
                disponible: plato.disponible ? 'Sí' : 'No',
                ingredientes: plato.ingredientes ? plato.ingredientes.join(", ") // Unimos los ingredientes como una cadena de texto
                    : "Sin ingredientes", // Si no hay ingredientes, mostramos "Sin ingredientes"
                createdAt: plato.createdAt,
            }));
    
            setPlatos(formattedData);
        } catch (error) {
            console.error("Error al obtener los platos:", error);
        }
    };

    useEffect(() => {
        fetchPlatos();
    }, []);

    return { platos, fetchPlatos, setPlatos };
};

export default useGetPlatos;
