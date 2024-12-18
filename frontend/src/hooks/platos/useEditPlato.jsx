import { useState } from 'react';
import { updatePlato } from '@services/plato.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPlatoData } from '@helpers/formatPlatoData.js';

const useEditPlato = (setPlatos) => {
    const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
    const [dataPlato, setDataPlato] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataPlato.length > 0) {
            setIsPopupEditOpen(true);
        }
    };

    const handleUpdate = async (updatedPlatoData) => {
        if (updatedPlatoData) {
            try {
                const updatedPlato = await updatePlato(updatedPlatoData, dataPlato[0].id);
                showSuccessAlert('¡Actualizado!', 'El plato ha sido actualizado correctamente.');
                setIsPopupEditOpen(false);
                const formattedPlato = formatPlatoData(updatedPlato);

                setPlatos(prevPlatos => prevPlatos.map(plato => {
                    return plato.id === formattedPlato.id ? formattedPlato : plato;
                }));
                
                setDataPlato([]);
            } catch (error) {
                console.error('Error al actualizar el plato:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el plato.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataPlato,
        setDataPlato
    };
};

export default useEditPlato;