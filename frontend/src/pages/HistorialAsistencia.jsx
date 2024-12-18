import { useEffect, useState } from 'react';
import useHistorialAsistencia from '@hooks/historial/useHistorialAsistencia';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import AttendanceTable from '@components/AttendanceTable'; 
import '@styles/historial.css';

const HistorialAsistencia = () => {
    const { historial, error, loading, subirJustificativo } = useHistorialAsistencia();
    const [selectedHistorial, setSelectedHistorial] = useState(null);

    useEffect(() => {
        console.log('Componente HistorialAsistencia montado.');
        console.log("Datos del historial inicialmente:", historial);

        if (historial.length > 0) {
            const table = new Tabulator("#historial-table", {
                data: historial,
                columns: [
                    { 
                        formatter: "rowSelection", 
                        titleFormatter: "rowSelection",
                        hozAlign: "center", 
                        headerSort: false, 
                        cellClick: function (e, cell) {
                            console.log("Celda seleccionada:", cell);
                            cell.getRow().toggleSelect();
                        }
                    },
                    
                    { title: 'Nombre completo', field: 'personal.nombreCompleto', width: 200 },
                    { title: 'Estado', field: 'estado', width: 200 },
                    { title: 'Fecha', field: 'fecha', width: 200 },
                    { title: 'Justificativo', field: 'justificativo', width: 200, formatter: (cell) => {
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
                    } }
                ],
                layout: "fitColumns",
                responsiveLayout: "collapse",
                pagination: true,
                paginationSize: 6,
                selectableRows: 1, 
                rowSelectionChanged: function(data) {
                    console.log("rowSelectionChanged triggered");
                    const selectedData = data.length > 0 ? data[0] : null;
                    console.log("Datos de fila seleccionada (rowSelectionChanged):", selectedData);
                    setSelectedHistorial(selectedData);
                },
                rowSelected: (row) => {
                    
                }
            });

           
            console.log("Tabla Tabulator inicializada:", table);
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
        console.log("Justificativo subido para asistencia ID:", asistenciaId);
    };

    return (
        <div className="historial-container">
            <h1 className="title-historial">Historial de Asistencia</h1>

            {loading && <p>Cargando historial...</p>}  {}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}  {}

            <div id="historial-table"></div> {}

            {selectedHistorial && (
                <>
                    <p>Datos seleccionados:</p>
                    <pre>{JSON.stringify(selectedHistorial, null, 2)}</pre> {}
                    <AttendanceTable data={selectedHistorial.personal} /> {}
                </>
            )}
        </div>
    );
};

export default HistorialAsistencia;
