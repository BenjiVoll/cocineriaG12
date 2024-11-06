import axios from './root.service.js';
import { formatAsistenciaData } from '@helpers/formatAsistenciaData.js';

export async function getAsistencias() {
    try {
        const { data } = await axios.get('/asistencia/');
        const formattedData = data.data.map(formatAsistenciaData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function addAsistencia(newAsistenciaData) {
    try {
        const { data } = await axios.post('/asistencia/', newAsistenciaData); 
        return data.data;
    } catch (error) {
        console.error("Error al añadir el pedido:", error);
        return error.response.data;
    }
}

export async function updateAsistencia(data, id) {
    try {
        const response = await axios.patch(`/asistencia/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteAsistencia(id) {
    try {
        const response = await axios.delete(`/asistencia/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
