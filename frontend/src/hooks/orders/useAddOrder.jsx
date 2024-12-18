import { useState } from 'react';
import axios from 'axios';

const useAddOrder = (setOrders) => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
      productos: '',
      estado: '',
      precioTotal: '',
      metodoPago: '',
  });


  const handleAddOrder = () => {
    setIsAddPopupOpen(true);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrderData({
      ...newOrderData,
      [name]: value,
    });
  };


  const handleSubmitNewOrder = async () => {
    try {
      const response = await axios.post('/api/order/', newOrderData);
      setOrders((prevOrders) => [...prevOrders, response.data]);
      setIsAddPopupOpen(false);
      setNewOrderData({
        productos: '',
	      estado: '',
        precioTotal: '',
	      metodoPago: '',
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
