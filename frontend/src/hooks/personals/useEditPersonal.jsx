import { useState } from "react";
import { editPersonal } from "@services/personal.service.js"; 

const useEditPersonal = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [isEditing, setIsEditing] = useState(false);

    const handleEditPersonal = async (id, updatedData, callback) => {
        try {
            setIsEditing(true);
            await editPersonal(updatedData, id); 
            if (callback) callback(); 
            setIsEditing(false);
            setIsPopupOpen(false); 
        } catch (error) {
            console.error("Error al editar personal: ", error);
            setIsEditing(false);
        }
    };

    return { 
        handleEditPersonal, 
        isEditing,
        isPopupOpen,  
        setIsPopupOpen 
    };
};

export default useEditPersonal;
