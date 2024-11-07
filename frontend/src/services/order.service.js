import axios from './root.service.js';
import { formatOrderData } from '@helpers/formatOrderData.js';

export async function getOrders() {
    try {
        const { data } = await axios.get('/order/');
        const formattedData = data.data.map(formatOrderData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function addOrder(newOrderData) {
    try {
        const { data } = await axios.post('/order/', newOrderData); 
        return data.data;
    } catch (error) {
        console.error("Error al añadir el pedido:", error);
        return error.response.data;
    }
}

export async function updateOrder(data, id) {
    try {
        const response = await axios.patch(`/order/${id}`, data,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteOrder(id) {
    try {
        const response = await axios.delete(`/order/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
