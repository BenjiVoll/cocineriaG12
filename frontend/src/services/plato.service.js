import axios from './root.service.js';
import { formatPlatoData } from '@helpers/formatPlatoData.js';

export async function getPlatos() {
    try {
        const { data } = await axios.get('/plato/');
        const formattedData = data.data.map(formatPlatoData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function addPlato(newPlatoData) {
    try {
        const { data } = await axios.post('/plato/', newPlatoData); 
        return data.data;
    } catch (error) {
        console.error("Error al añadir el plato:", error);
        return error.response.data;
    }
}

export async function updatePlato(data, id) {
    try {
        const response = await axios.patch(`/plato/update/${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deletePlato(id) {
    try {
        const response = await axios.delete(`/plato/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el plato:', error);
        throw error;
    }
}
