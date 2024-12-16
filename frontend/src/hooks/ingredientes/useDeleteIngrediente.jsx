import { deleteIngrediente } from '@services/ingrediente.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteIngrediente = (fetchIngredientes, setDataIngrediente) => {
    const handleDelete = async (dataIngrediente) => {
        if (dataIngrediente.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    console.log('dataIngrediente:', dataIngrediente);
                    const ingredienteId = dataIngrediente[0].id;
                    if (!ingredienteId) {
                        return showErrorAlert('Error', 'ID del ingrediente no encontrado.');
                    }
                    const response = await deleteIngrediente(ingredienteId);
                    if (response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!', 'El ingrediente ha sido eliminado correctamente.');
                    await fetchIngredientes();
                    setDataIngrediente([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el ingrediente:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el ingrediente.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteIngrediente;