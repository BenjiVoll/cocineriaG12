import { useCallback, useState, useEffect } from 'react';
import Table from '@components/TableAsistencia'; // Importa el componente de tabla para asistencia
import usePersonals from '@hooks/personals/useGetPersonals'; // Usar el hook de personales para obtener la lista de personal actualizada
import useAsistencia from '@hooks/asistencia/useAsistencia'; // Hook para manejar asistencia
import Search from '../components/Search';
import '@styles/asistencias.css';

const AsistenciaTable = () => {
    const { personals, fetchPersonals } = usePersonals();
    const [filterAsistenciaId, setFilterAsistenciaId] = useState('');
    const [selectedPersonal, setSelectedPersonal] = useState(null);

    const { handleAsistencia, isLoading: isAsistenciaLoading, error: asistenciaError } = useAsistencia();

    const handleSelectionChange = useCallback((selectedPersonals) => {
        const selected = selectedPersonals.length > 0 ? selectedPersonals[0] : null;
        setSelectedPersonal(selected);
    }, []);

    const handleAsistenciaButtonClick = (estado, justificativo = null) => {
        if (selectedPersonal) {
            handleAsistencia(selectedPersonal.id, estado, justificativo);
        }
    };

    const handleAsistenciaIdFilterChange = (e) => {
        setFilterAsistenciaId(e.target.value);
    };

    useEffect(() => {
        const handleButtonClick = (event) => {
            if (event.target.matches('.attendance-button')) {
                const estado = event.target.dataset.estado;
                handleAsistenciaButtonClick(estado);
            }
        };
        document.addEventListener('click', handleButtonClick);

        return () => {
            document.removeEventListener('click', handleButtonClick);
        };
    }, [handleAsistenciaButtonClick]);

    const columns = [
        { title: 'ID', field: 'id', width: 100 },
        { title: 'Nombre completo', field: 'nombreCompleto', width: 200 },
        { title: 'Teléfono', field: 'telefono', width: 200 },
        { title: 'Fecha', field: 'fechaIncorporacion', width: 200 },
        { title: 'Cargo', field: 'cargo', width: 200 },
        { title: 'Creado en', field: 'createdAt', width: 200 },
        { title: 'Actualizado', field: 'updatedAt', width: 200 },
        {
            title: 'Asistencia', field: 'asistencia', width: 300, formatter: (cell) => {
                return `
                    <div>
                        <button class="attendance-button" data-estado="Presente">Presente</button>
                        <button class="attendance-button" data-estado="Ausente">Ausente</button>
                        <button class="attendance-button" data-estado="Justificado">Ausente Justificado</button>
                    </div>
                `;
            }
        }
    ];

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="top-table">
                    <h1 className="title-table">Control de Asistencia</h1>
                    <div className="filter-actions">
                        <Search
                            value={filterAsistenciaId}
                            onChange={handleAsistenciaIdFilterChange}
                            placeholder="Filtrar por ID de Personal"
                        />
                    </div>
                </div>
                <Table
                    data={personals}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                />
            </div>

            {asistenciaError && <p style={{ color: 'red' }}>Error al registrar asistencia: {asistenciaError}</p>}
        </div>
    );
};

export default AsistenciaTable;
