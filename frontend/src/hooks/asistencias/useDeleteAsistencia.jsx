import { deleteAsistencia} from '@services/asistencia.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteAsistencia = (fetchAsistencias, setDataAsistencia) => {
    const handleDelete = async (dataAsistencia) => {
        if (dataAsistencia.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteAsistencia(dataAsistencia[0].id); // Asegúrate de que 'id' es el identificador correcto
                    if (response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!', 'El pedido ha sido eliminado correctamente.');
                    await fetchAsistencias();
                    setDataAsistencia([]);
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

export default useDeleteAsistencia;
