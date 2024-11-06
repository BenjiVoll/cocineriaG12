import { useState } from 'react';
import { updatePersonal } from '@services/personal.service.js'; // Asegúrate de tener este servicio
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditPersonal = (setPersonals) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataPersonal, setDataPersonal] = useState([]);

    const handleClickUpdate = () => {
        if (dataPersonal.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedPersonalData) => {
        if (updatedPersonalData) {
            try {
                const updatedPersonal = await updatePersonal(updatedPersonalData, dataPersonal[0].id);
                showSuccessAlert('¡Actualizado!', 'El pedido ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedPersonal = formatPostUpdate(updatedPersonal);

                setPersonals(prevPersonals => prevPersonals.map(personal => {
                    console.log("Pedido actual:", personal);
                    if (personal.id === formattedPersonal.id) {
                        console.log("Reemplazando con:", formattedPersonal);
                    }
                    return personal.id === formattedPersonal.id ? formattedPersonal : personal;
                }));

                setDataPersonal([]);
            } catch (error) {
                console.error('Error al actualizar el pedido:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el pedido.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataPersonal,
        setDataPersonal
    };
};

export default useEditPersonal;
