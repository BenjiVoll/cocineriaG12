import axios from './root.service.js';
import { formatPersonalData } from '@helpers/formatPersonalData.js';

export async function getPersonals() {
    try {
        const { data } = await axios.get('/personal/');
        const formattedData = data.data.map(formatPersonalData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function addPersonal(newPersonalData) {
    try {
        const { data } = await axios.post('/personal/', newPersonalData); 
        return data.data;
    } catch (error) {
        console.error("Error al agregar personal:", error);
        return error.response.data;
    }
}

export async function editPersonal(updatedData, id) {
    try {
        const response = await axios.put(`/personal/${id}`, updatedData);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deletePersonal(id) {
    try {
        const response = await axios.delete(`/personal/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
