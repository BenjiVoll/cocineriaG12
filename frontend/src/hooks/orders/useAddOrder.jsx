import { useState } from 'react';
import axios from 'axios';

const useAddOrder = (setOrders) => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    nombreCliente: '',
    estado: '',
    precioTotal: '',
    fechaEntrega: '',
  });

  // Abre el popup de añadir pedido
  const handleAddOrder = () => {
    setIsAddPopupOpen(true);
  };

  // Maneja el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrderData({
      ...newOrderData,
      [name]: value,
    });
  };

  // Envía el nuevo pedido a la base de datos y actualiza la lista de pedidos
  const handleSubmitNewOrder = async () => {
    try {
      const response = await axios.post('/api/orders', newOrderData); // Ajusta la URL según tu backend
      setOrders((prevOrders) => [...prevOrders, response.data]); // Añade el nuevo pedido a la lista actual
      setIsAddPopupOpen(false);
      setNewOrderData({
        nombreCliente: '',
        estado: '',
        precioTotal: '',
        fechaEntrega: '',
      });
    } catch (error) {
      console.error('Error al añadir el pedido:', error);
    }
  };

  return {
    isAddPopupOpen,
    setIsAddPopupOpen,
    newOrderData,
    setNewOrderData,
    handleAddOrder,
    handleInputChange,
    handleSubmitNewOrder,
  };
};

export default useAddOrder;
