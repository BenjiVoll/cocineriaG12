import { deletePersonal } from '@services/personal.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeletePersonal = (fetchPersonals, setDataPersonal) => {
    const handleDelete = async (dataPersonal) => {
        if (dataPersonal.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deletePersonal(dataPersonal[0].id); // Asegúrate de que 'id' es el identificador correcto
                    if (response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!', 'El pedido ha sido eliminado correctamente.');
                    await fetchPersonals();
                    setDataPersonal([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el pedido:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el pedido.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeletePersonal;
