import React, { useState, useEffect } from 'react';
import { generateAsistenciaReport } from '../helpers/reporte';
import useHistorialAsistencia from '@hooks/historial/useHistorialAsistencia';
import '@styles/reporteAsistencia.css'; 

const ReporteAsistencia = () => {
    const { historial, fetchHistorial, filterByName } = useHistorialAsistencia();
    const [personalName, setPersonalName] = useState('');

    useEffect(() => {
        fetchHistorial();
    }, []);

    const handleGenerateReport = () => {
        if (!personalName) return;
        const asistenciaData = historial.filter(record => record.personal.nombreCompleto.toLowerCase().includes(personalName.toLowerCase()));
        generateAsistenciaReport(asistenciaData, personalName);
    };

    return (
        <div className="report-container">
            <h1 className="report-title">Generar Informe de Asistencia</h1>
            <input 
                className="report-input" 
                type="text" 
                placeholder="Nombre del Personal" 
                value={personalName} 
                onChange={(e) => setPersonalName(e.target.value)} 
            />
            <button 
                className="report-button" 
                onClick={handleGenerateReport} 
                disabled={!personalName}
            >
                Generar Informe
            </button>
        </div>
    );
};

export default ReporteAsistencia;
