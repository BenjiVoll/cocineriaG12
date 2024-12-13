import axios from './root.service.js';
import { formatIngredienteData } from '@helpers/formatIngredienteData.js';

export async function getIngredientes() {
    try {
        const { data } = await axios.get('/ingrediente/');
        const formattedData = data.data.map(formatIngredienteData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function addOrder(newIngredienteData) {
    try {
        const { data } = await axios.post('/ingrediente/', newIngredienteData); 
        return data.data;
    } catch (error) {
        console.error("Error al añadir el ingrediente:", error);
        return error.response.data;
    }
}

export async function updateIngrediente(data, id) {
    try {
        const response = await axios.patch(`/ingrediente/update/${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteIngrediente(id) {
    try {
        const response = await axios.delete(`/ingrediente/delete/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}