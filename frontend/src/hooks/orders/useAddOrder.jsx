import { useState } from 'react';
import { addOrder } from '@services/order.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useAddOrder = (fetchOrders, setOrders) => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [orderData, setOrderData] = useState({
      productos: '',
      estado: '',
      precioTotal: '',
      metodoPago: '',
  });
  const handleClickAdd = () => {
    setIsAddPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };


  const handleAddOrder = async (data) => {
    try {
      const newOrder = await addOrder(data);
      showSuccessAlert('¡Creado!', 'El Pedido se ha registrado correctamente.');
      setIsAddPopupOpen(false);
      setOrders(prevOrders => [...prevOrders, newOrder]);


      setOrderData({
        productos: '',
	      estado: '',
        precioTotal: '',
	      metodoPago: '',
      });
      await fetchOrders();

    } catch (error) {
      console.error('Error al añadir el pedido:', error);
      showErrorAlert('Error', error);
    }
  };

  return {
    isAddPopupOpen,
    setIsAddPopupOpen,
    orderData,
    setOrderData,
    handleAddOrder,
    handleInputChange,
    handleClickAdd,
  };
};

export default useAddOrder;
