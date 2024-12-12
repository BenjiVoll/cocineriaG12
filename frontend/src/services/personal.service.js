import axios from './root.service.js';
import { formatPersonalData } from '@helpers/formatPersonalData.js';

export async function getPersonals() {
    try {
        const { data } = await axios.get('/personal/');
        console.log("Respuesta del servidor (Axios) al obtener:", data);
        return data.data.map(formatPersonalData);
    } catch (error) {
        console.error("Error al obtener personal:", error);
        throw error.response?.data || { success: false, message: "Error desconocido" };
    }
}

export async function addPersonal(newPersonalData) {
    console.log("Datos recibidos en addPersonal (personal.service):", newPersonalData);
    try {
        const { data } = await axios.post('/personal/', newPersonalData);
        console.log("Respuesta del servidor (Axios) al agregar:", data);
        return data.data;
    } catch (error) {
        console.error("Error al agregar personal:", error);
        throw error.response?.data || { success: false, message: "Error desconocido" };
    }
}

export async function editPersonal(id, updatedData) {
    try {
        console.log("Datos recibidos en editPersonal (personal.service):", updatedData, "ID:", id);
        const { data } = await axios.put(`/personal/${id}`, updatedData);
        console.log("Respuesta del servidor (Axios) al editar:", data);
        return data;
    } catch (error) {
        console.error("Error al editar personal:", error);
        throw error.response?.data || { success: false, message: "Error desconocido" };
    }
}

export async function deletePersonal(id) {
    try {
        console.log("ID recibido en deletePersonal (personal.service):", id);
        const { data } = await axios.delete(`/personal/${id}`);
        console.log("Respuesta del servidor (Axios) al eliminar:", data);
        return data;
    } catch (error) {
        console.error("Error al eliminar personal:", error);
        throw error.response?.data || { success: false, message: "Error desconocido" };
    }
}
