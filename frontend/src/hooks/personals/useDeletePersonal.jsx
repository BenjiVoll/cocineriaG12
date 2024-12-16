import { useState } from "react";
import { deletePersonal } from "@services/personal.service.js"; 

const useDeletePersonal = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeletePersonal = async (id, callback) => {
        try {
            setIsDeleting(true);
            await deletePersonal(id); 
            if (callback) callback(); 
            setIsDeleting(false);
        } catch (error) {
            console.error("Error al eliminar personal: ", error);
            setIsDeleting(false);
        }
    };

    return { handleDeletePersonal, isDeleting };
};

export default useDeletePersonal;
