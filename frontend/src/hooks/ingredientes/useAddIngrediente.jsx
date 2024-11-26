import { useState, useEffect } from 'react';
import axios from 'axios';

const useAddIngrediente = () => {
    const [errorNombre, setErrorNombre] = useState('');
    const [errorCantidad, setErrorCantidad] = useState('');
    const [inputData, setInputData] = useState({ nombre: '', cantidad: '' });
    const [ingredientes, setIngredientes] = useState([]);

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
        if (inputData.cantidad) setErrorCantidad('');
    }, [inputData.nombre, inputData.cantidad]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'nombre') {
            setErrorNombre(dataMessage.message);
        } else if (dataMessage.dataInfo === 'cantidad') {
            setErrorCantidad(dataMessage.message);
        }
    };

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const addIngrediente = async () => {
        try {
            const response = await axios.post('ingredientes', inputData);
            setIngredientes(prevIngredientes => [...prevIngredientes, response.data]);
            setInputData({ nombre: '', cantidad: '' });
        } catch (error) {
            console.error('Error al agregar ingrediente:', error);
            if (error.response && error.response.data) {
                errorData(error.response.data);
            }
        }
    };

    return {
        errorNombre,
        errorCantidad,
        inputData,
        ingredientes,
        errorData,
        handleInputChange,
        addIngrediente,
    };
};

export default useAddIngrediente;