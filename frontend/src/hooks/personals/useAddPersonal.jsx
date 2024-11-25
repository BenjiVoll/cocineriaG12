import { useState } from "react";
import { addPersonal } from "@services/personal.service.js"; 

const useAddPersonal = () => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddPersonal = async (personalData) => {
        try {
            setIsAdding(true);
            await addPersonal(personalData); 
            setIsAdding(false);
        } catch (error) {
            console.error("Error al agregar personal: ", error);
            setIsAdding(false);
        }
    };

    return { handleAddPersonal, isAdding };
};

export default useAddPersonal;
