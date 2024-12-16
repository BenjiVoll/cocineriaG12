import { useState } from 'react';
import { addIngrediente } from '@services/ingrediente.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useAddIngrediente = (setIngredientes) => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [ingredienteData, setIngredienteData] = useState({
        nombre: '',
        cantidad: 0,
    });

    const handleClickAdd = () => {
        setIsAddPopupOpen(true);
    };

    const handleAddIngrediente = async (data) => {
        try {
            console.log('Datos del ingrediente antes de agregar:', data); // Agrega este log
            const newIngrediente = await addIngrediente(data);
            showSuccessAlert('¡Creado!', 'El ingrediente ha sido creado correctamente.');
            setIsAddPopupOpen(false);
            setIngredientes(prevIngredientes => [...prevIngredientes, newIngrediente]);
            setIngredienteData({
                nombre: '',
                cantidad: 0,
            });
        } catch (error) {
            console.error('Error al crear el ingrediente:', error);
            showErrorAlert('Error', error);
        }
    };

    return {
        isAddPopupOpen,
        setIsAddPopupOpen,
        ingredienteData,
        setIngredienteData,
        handleAddIngrediente,
        handleClickAdd
    };
};

export default useAddIngrediente;