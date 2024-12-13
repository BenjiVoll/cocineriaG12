import { useState } from 'react';
import axios from 'axios';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';

const useAddIngrediente = (setIngredientes) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddIngrediente = async (newIngrediente) => {
        setIsPopupOpen(false); // Cerrar popup antes de la solicitud
        try {
            const response = await axios.post('/api/ingrediente', newIngrediente);
            setIngredientes((prevIngredientes) => [...prevIngredientes, response.data]);
            showSuccessAlert('¡Agregado!', 'El ingrediente ha sido agregado correctamente.');
        } catch (error) {
            console.error('Error al agregar el ingrediente:', error);
            showErrorAlert('Error', 'Ocurrió un error al agregar el ingrediente.');
        }
    };

    const handleClickAdd = () => {
        setIsPopupOpen(true);
    };

    return {
        handleAddIngrediente,
        isPopupOpen,
        setIsPopupOpen,
        handleClickAdd
    };
};

export default useAddIngrediente;