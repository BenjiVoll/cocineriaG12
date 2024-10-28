import axios from './root.service.js';
import { formatOrderData } from '@helpers/formatOrderData.js';

export async function getOrders() {
    try {
        const { data } = await axios.get('/orders/');
        const formattedData = data.data.map(formatOrderData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateOrder(data, orderId) {
    try {
        const response = await axios.patch(`/orders/detail/?id=${orderId}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteOrder(orderId) {
    try {
        const response = await axios.delete(`/orders/detail/?id=${orderId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
