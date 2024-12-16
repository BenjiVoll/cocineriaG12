import axios from './root.service.js';

export const registerAsistencia = async (asistenciaData) => {
    try {
        const response = await axios.post('/asistencia', asistenciaData);
        return response.data;
    } catch (error) {
        console.error("Error al registrar asistencia:", error);
        throw error.response?.data || { success: false, message: "Error desconocido" };
    }
};

export const updatePersonalAsistencia = async (personalId, estado) => {
    try {
        const response = await axios.put(`/asistencia/personal/${personalId}/asistencia`, { estado });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar estado de asistencia:", error);
        throw error.response?.data || { success: false, message: "Error desconocido" };
    }
};
