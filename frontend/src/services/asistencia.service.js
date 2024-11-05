// asistencia.service.js
import axios from 'axios';

export const getAsistencia = async () => {
    const response = await axios.get('/api/asistencia'); // Asegúrate de que esta ruta sea correcta
    return response.data; // Asegúrate de devolver solo los datos
};
