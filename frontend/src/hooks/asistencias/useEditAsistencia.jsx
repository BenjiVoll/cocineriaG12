import { useState } from 'react';
import { updateAsistencia } from '@services/asistencia.service.js'; // Asegúrate de tener este servicio
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditAsistencia = (setAsistencias) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataAsistencia, setDataAsistencia] = useState([]);

    const handleClickUpdate = () => {
        if (dataAsistencia.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedAsistenciaData) => {
        if (updatedAsistenciaData) {
            try {
                const updatedAsistencia = await updateAsistencia(updatedAsistenciaData, dataAsistencia[0].id);
                showSuccessAlert('¡Actualizado!', 'El pedido ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedAsistencia = formatPostUpdate(updatedAsistencia);

                setAsistencias(prevAsistencias => prevAsistencias.map(asistencia => {
                    console.log("Pedido actual:", asistencia);
                    if (asistencia.id === formattedasistencia.id) {
                        console.log("Reemplazando con:", formattedasistencia);
                    }
                    return asistencia.id === formattedasistencia.id ? formattedasistencia : asistencia;
                }));

                setDataAsistencia([]);
            } catch (error) {
                console.error('Error al actualizar asistencia:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar asistencia.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataAsistencia,
        setDataAsistencia
    };
};

export default useEditAsistencia;
