import { useState } from 'react';
import { updateOrder } from '@services/order.service.js'; // Asegúrate de tener este servicio
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

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
                showSuccessAlert('¡Actualizado!', 'El pedido ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedOrder = formatPostUpdate(updatedOrder);

                setOrders(prevOrders => prevOrders.map(order => {
                    console.log("Pedido actual:", order);
                    if (order.id === formattedOrder.id) {
                        console.log("Reemplazando con:", formattedOrder);
                    }
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
