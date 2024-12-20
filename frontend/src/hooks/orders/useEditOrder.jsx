import { useState } from 'react';
import { updateOrder } from '@services/order.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatOrderData } from '@helpers/formatOrderData.js';

const useEditOrder = (setOrders) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataOrder, setDataOrder] = useState([]);

    const handleClickUpdate = () => {
        if (dataOrder.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedOrderData) => {
        if (updatedOrderData) {
            try {
                const updatedOrder = await updateOrder(updatedOrderData, dataOrder[0].id);
                showSuccessAlert('¡Actualizado!', 'El Pedido ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedOrder = formatOrderData(updatedOrder);

                setOrders(prevOrders => prevOrders.map(order => {
                    return order.id === formattedOrder.id ? formattedOrder : order;
                }));
                
                setDataOrder([]);
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
        dataOrder,
        setDataOrder
    };
};

export default useEditOrder;
