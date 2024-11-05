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

export async function updateOrder(data, id) {
    try {
        const response = await axios.patch(`/order/detail/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteOrder(id) {
    try {
        const response = await axios.delete(`/order/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
