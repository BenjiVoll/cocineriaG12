import { useState } from 'react';
import { editPersonal as editPersonalService } from '@services/personal.service.js';

const useEditPersonal = (fetchPersonals) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEditPersonal = async (id, updatedData) => {
        setIsLoading(true);
        setError(null);
        try {
            console.log("Editando personal con ID:", id); 
            await editPersonalService(id, updatedData);
            await fetchPersonals(); 
            console.log("Personal editado correctamente");
        } catch (err) {
            console.error("Error al editar personal:", err);
            setError(err.message || 'Error desconocido');
        } finally {
            setIsLoading(false);
            setIsPopupOpen(false);
        }
    };

    return { handleEditPersonal, isPopupOpen, setIsPopupOpen, isLoading, error };
};

export default useEditPersonal;
