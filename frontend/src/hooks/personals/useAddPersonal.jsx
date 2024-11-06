import { useState } from 'react';
import axios from 'axios';

const useAddPersonal = (setPersonals) => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newPersonalData, setNewPersonalData] = useState({
    estado: '',
    precioTotal: '',
    fechaEntrega: '',
  });

  // Abre el popup de añadir pedido
  const handleAddPersonal = () => {
    setIsAddPopupOpen(true);
  };

  // Maneja el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPersonalData({
      ...newPersonalData,
      [name]: value,
    });
  };

  // Envía el nuevo pedido a la base de datos y actualiza la lista de pedidos
  const handleSubmitNewPersonal = async () => {
    try {
      const response = await axios.post('/api/personals', newPersonalData); // Ajusta la URL según tu backend
      setPersonals((prevPersonals) => [...prevPersonals, response.data]); // Añade el nuevo pedido a la lista actual
      setIsAddPopupOpen(false);
      setNewPersonalData({
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
    newPersonalData,
    setNewPersonalData,
    handleAddPersonal,
    handleInputChange,
    handleSubmitNewPersonal,
  };
};

export default useAddPersonal;
