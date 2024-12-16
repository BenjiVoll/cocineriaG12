import { useState } from 'react';
import { deletePersonal as deletePersonalService } from '@services/personal.service.js';

const useDeletePersonal = (fetchPersonals) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (selectedPersonals) => {
        if (!selectedPersonals || selectedPersonals.length === 0) {
            return;
        }
        setIsDeleting(true);
        setError(null);

        try {
            for (const personal of selectedPersonals) {
                console.log("Eliminando personal con ID:", personal.id); 
                await deletePersonalService(personal.id);
            }
            await fetchPersonals(); 
        } catch (err) {
            console.error("Error al eliminar personal:", err); 
            setError(err.message || 'Error desconocido');
        } finally {
            setIsDeleting(false);
        }
    };

    return { handleDelete, isDeleting, error };
};

export default useDeletePersonal;
