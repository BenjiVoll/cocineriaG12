import { useEffect, useState } from 'react';
import useHistorialAsistencia from '@hooks/historial/useHistorialAsistencia';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import AttendanceTable from '@components/AttendanceTable'; // Asegúrate de ajustar la ruta
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
                    { title: 'ID', field: 'id', width: 100 },
                    { title: 'Personal ID', field: 'personal.id', width: 200 },
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
                selectableRows: 1, // Usar selectableRows en lugar de selectable
                rowClick: (e, row) => {
                    const data = row.getData();
                    console.log("Fila seleccionada (rowClick):", data);
                    setSelectedHistorial(data);
                }
            });
        }
    }, [historial]);

    // Definir la función `handleFileButtonClick` en el contexto global
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

            {loading && <p>Cargando historial...</p>}  {/* Mostrar mensaje de carga */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}  {/* Mostrar error si ocurre */}

            <div id="historial-table"></div> {/* Aquí se renderiza la tabla Tabulator */}

            {selectedHistorial && (
                <>
                    <p>Datos seleccionados:</p>
                    <pre>{JSON.stringify(selectedHistorial, null, 2)}</pre> {/* Mostrar datos seleccionados */}
                    <AttendanceTable data={selectedHistorial.personal} /> {/* Mostrar tabla de asistencia */}
                </>
            )}
        </div>
    );
};

export default HistorialAsistencia;
