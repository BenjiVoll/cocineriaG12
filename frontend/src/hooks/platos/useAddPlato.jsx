import { useState } from 'react';
import { addPlato } from '@services/plato.service.js'; // Asegúrate de tener este servicio implementado
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useAddPlato = (fetchPlatos, setPlatos) => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [platoData, setPlatoData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        disponible: false
    });

    const handleClickAdd = () => {
        setIsAddPopupOpen(true);
    };

    const handleAddPlato = async (data) => {
        try {
            const newPlato = await addPlato(data);
            showSuccessAlert('¡Creado!', 'El plato ha sido creado correctamente.');
            setIsAddPopupOpen(false);
            setPlatos(prevPlatos => [...prevPlatos, newPlato]);

            
            setPlatoData({
                nombre: '',
                descripcion: '',
                precio: '',
                disponible: false
            });
            await fetchPlatos();

        } catch (error) {
            console.error('Error al crear el plato:', error);
            showErrorAlert('Error', error);
        }
    };

    return {
        isAddPopupOpen,
        setIsAddPopupOpen,
        platoData,
        setPlatoData,
        handleAddPlato,
        handleClickAdd
    };
};

export default useAddPlato;
