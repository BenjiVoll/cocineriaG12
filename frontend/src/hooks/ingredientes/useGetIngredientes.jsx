import { useState, useEffect } from 'react';
import { getIngredientes } from '@services/ingrediente.service.js';

const useGetIngredientes = () => {
    const [ingredientes, setIngredientes] = useState([]);

    const fetchIngredientes = async () => {
        try {
            const response = await getIngredientes();
            const formattedData = response.map(ingrediente => ({
                id: ingrediente.id,
                nombre: ingrediente.nombre,
                cantidad: ingrediente.cantidad,
                createdAt: ingrediente.createdAt
            }));
            dataLogged(formattedData);
            setIngredientes(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchIngredientes();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const storedIngrediente = sessionStorage.getItem('ingrediente');
            if (storedIngrediente) {
                const { nombre } = JSON.parse(storedIngrediente);
                for(let i = 0; i < formattedData.length ; i++) {
                    if(formattedData[i].nombre === nombre) {
                        formattedData.splice(i, 1);
                        break;
                    }
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { ingredientes, fetchIngredientes, setIngredientes };
};

export default useGetIngredientes;