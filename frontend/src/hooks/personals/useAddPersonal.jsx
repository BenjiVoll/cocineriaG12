import { useState } from 'react';
import { addPersonal as addPersonalService } from '@services/personal.service.js';

const useAddPersonal = (fetchPersonals) => {
    const [isAdding, setIsAdding] = useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [newPersonalData, setNewPersonalData] = useState({
        nombreCompleto: '',
        telefono: '',
        fechaIncorporacion: '',
        cargo: '',
    });
    const [error, setError] = useState(null);

    const handleSubmitNewPersonal = async (personalData) => {
        setIsAdding(true);
        setError(null);
        try {
            await addPersonalService(personalData);
            fetchPersonals();
            setIsAddPopupOpen(false); 
        } catch (err) {
            setError(err.message || 'Error desconocido');
        } finally {
            setIsAdding(false);
        }
    };

    return {
        handleSubmitNewPersonal,
        isAdding,
        isAddPopupOpen,
        setIsAddPopupOpen,
        newPersonalData,
        setNewPersonalData,
        error,
    };
};

export default useAddPersonal;
