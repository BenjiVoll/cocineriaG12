import { useState, useEffect } from 'react';
import { getOrders } from '@services/order.service.js';

const useGetOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            const formattedData = response.map(order => ({
                id: order.id,
                productos: order.productos,
                estado: order.estado,
                precioTotal: order.precioTotal,
                metodoPago: order.metodoPago,
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
