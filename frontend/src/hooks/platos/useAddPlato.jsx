import { useState, useEffect } from 'react';
import axios from 'axios';

const useAddPlato = () => {
    const [errorNombre, setErrorNombre] = useState('');
    const [errorDescripcion, setErrorDescripcion] = useState('');
    const [inputData, setInputData] = useState({ nombre: '', descripcion: '' });
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        if (inputData.nombre) setErrorNombre('');
        if (inputData.descripcion) setErrorDescripcion('');
    }, [inputData.nombre, inputData.descripcion]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'nombre') {
            setErrorNombre(dataMessage.message);
        } else if (dataMessage.dataInfo === 'descripcion') {
            setErrorDescripcion(dataMessage.message);
        }
    };

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const addPlato = async () => {
        try {
            const response = await axios.post('platos', inputData);
            setPlatos(prevPlatos => [...prevPlatos, response.data]);
            setInputData({ nombre: '', descripcion: '' });
        } catch (error) {
            console.error('Error al agregar plato:', error);
            if (error.response && error.response.data) {
                errorData(error.response.data);
            }
        }
    };

    return {
        errorNombre,
        errorDescripcion,
        inputData,
        platos,
        errorData,
        handleInputChange,
        addPlato,
    };
};

export default useAddPlato;