import React, { useState, useEffect } from 'react';
import useHistorialAsistencia from '@hooks/historial/useHistorialAsistencia';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import AttendanceTable from '@components/AttendanceTable';
import ReporteAsistencia from '@components/ReporteAsistencia';
import '@styles/historial.css';

const HistorialAsistencia = () => {
    const { historial, error, loading, subirJustificativo } = useHistorialAsistencia();
    const [selectedHistorial, setSelectedHistorial] = useState(null);

    useEffect(() => {
        if (historial.length > 0) {
            const table = new Tabulator("#historial-table", {
                data: historial,
                columns: [
                    { title: 'Nombre completo', field: 'personal.nombreCompleto', headerSort: false, width: 200 },
                    { title: 'Estado', field: 'estado', headerSort: false, width: 200 },
                    { title: 'Fecha', field: 'fecha', headerSort: false, width: 200 },
                    {
                        title: 'Justificativo', field: 'justificativo', width: 200, headerSort: false, formatter: (cell) => {
                            const justificativo = cell.getValue();
                            const asistenciaId = cell.getRow().getData().id;
                            const personalId = cell.getRow().getData().personal.id;
                            if (justificativo === 'Pendiente') {
                                return `
                                    <button class="upload-button" onclick="handleFileButtonClick(${personalId}, ${asistenciaId})">Subir PDF</button>
                                    <input type="file" id="upload-${asistenciaId}" style="display:none" accept="application/pdf" />
                                `;
                            }
                            return justificativo || '';
                        }
                    }
                ],
                layout: "fitColumns",
                responsiveLayout: "collapse",
                pagination: "local",
                paginationSize: 6,
                selectable: false,
                rowFormatter: function(row){
                   
                    row.getElement().style.fontSize = "14px";
                },
                headerSort: false,
                initialSort: [{ column: 'personal.nombreCompleto', dir: 'asc' }]
            });
        }
    }, [historial]);

    window.handleFileButtonClick = (personalId, asistenciaId) => {
        const inputElement = document.getElementById(`upload-${asistenciaId}`);
        inputElement.onchange = () => handleFileUpload(personalId, asistenciaId, inputElement.files[0]);
        inputElement.click();
    };

    const handleFileUpload = async (personalId, asistenciaId, file) => {
        if (!file) return;
        await subirJustificativo(personalId, asistenciaId, file);
    };

    return (
        <div className="historial-container">
            <h1 className="title-historial">Historial de Asistencia</h1>

            {loading && <p>Cargando historial...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <div id="historial-table"></div>

            {selectedHistorial && (
                <>
                    <p>Datos seleccionados:</p>
                    <pre>{JSON.stringify(selectedHistorial, null, 2)}</pre>
                    <AttendanceTable data={selectedHistorial.personal} />
                </>
            )}

            <ReporteAsistencia />
        </div>
    );
};

export default HistorialAsistencia;
