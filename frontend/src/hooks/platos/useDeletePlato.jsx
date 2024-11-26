import { deletePlato } from '@services/plato.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeletePlato = (fetchPlatos, setDataPlato) => {
    const handleDelete = async (dataPlato) => {
        if (dataPlato.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deletePlato(dataPlato[0].id);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!', 'El plato ha sido eliminado correctamente.');
                    await fetchPlatos();
                    setDataPlato([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el plato:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el plato.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeletePlato;