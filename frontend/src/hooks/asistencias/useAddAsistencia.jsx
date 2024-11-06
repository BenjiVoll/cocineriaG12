import { useState } from 'react';
import axios from 'axios';

const useAddAsistencia = (setAsistencias) => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newAsistenciaData, setNewAsistenciaData] = useState({
    estado: '',
    precioTotal: '',
    fechaEntrega: '',
  });

  // Abre el popup de añadir pedido
  const handleAddAsistencia = () => {
    setIsAddPopupOpen(true);
  };

  // Maneja el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsistenciaData({
      ...newAsistenciaData,
      [name]: value,
    });
  };

  // Envía el nuevo pedido a la base de datos y actualiza la lista de pedidos
  const handleSubmitNewAsistencia = async () => {
    try {
      const response = await axios.post('/api/asistencias', newAsistenciaData); // Ajusta la URL según tu backend
      setAsistencias((prevAsistencias) => [...prevAsistencias, response.data]); // Añade el nuevo pedido a la lista actual
      setIsAddPopupOpen(false);
      setNewAsistenciaData({
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
    newAsistenciaData,
    setNewAsistenciaData,
    handleAddAsistencia,
    handleInputChange,
    handleSubmitNewAsistencia,
  };
};

export default useAddAsistencia;
