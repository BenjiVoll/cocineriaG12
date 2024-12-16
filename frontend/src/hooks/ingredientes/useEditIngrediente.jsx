import { useState } from 'react';
import { updateIngrediente } from '@services/ingrediente.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatIngredientePostUpdate } from '@helpers/formatIngredienteData.js';

const useEditIngrediente = (setIngredientes) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataIngrediente, setDataIngrediente] = useState([]);

    const handleClickUpdate = () => {
        if (dataIngrediente.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedIngredienteData) => {
        if (updatedIngredienteData) {
            try {
                const updatedIngrediente = await updateIngrediente(updatedIngredienteData, dataIngrediente[0].id);
                showSuccessAlert('¡Actualizado!', 'El ingrediente ha sido actualizado correctamente.');
                setIsPopupEditOpen(false);
                const formattedIngrediente = formatIngredientePostUpdate(updatedIngrediente);

                setIngredientes(prevIngredientes => prevIngredientes.map(ingrediente => {
                    console.log("Ingrediente actual:", ingrediente);
                    if (ingrediente.id === formattedIngrediente.id) {
                        console.log("Reemplazando con:", formattedIngrediente);
                        return formattedIngrediente;
                    }
                    return ingrediente;
                }));

                setDataIngrediente([]);
            } catch (error) {
                console.error('Error al actualizar el ingrediente:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el ingrediente.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataIngrediente,
        setDataIngrediente
    };
};

export default useEditIngrediente;