import { useState, useEffect } from 'react';
import { getOrders } from '@services/order.service.js'; // Asegúrate de tener este servicio

const useGetOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            const formattedData = response.map(order => ({
                id: order.id,
                orderDetails: order.orderDetails,
                status: order.status,
                totalAmount: order.totalAmount,
                orderDate: order.orderDate,
                deliveryDate: order.deliveryDate
            }));
            setOrders(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, fetchOrders, setOrders };
};

export default useGetOrders;
