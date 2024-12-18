import { useCallback, useState, useEffect } from 'react';
import Table from '@components/TableAsistencia';
import usePersonals from '@hooks/personals/useGetPersonals';
import useAsistencia from '@hooks/asistencia/useAsistencia';
import Search from '../components/Search';
import '@styles/asistencias.css';

const Asistencias = () => {
    const { personals, fetchPersonals } = usePersonals();
    const [filterName, setFilterName] = useState(''); // Estado para el filtro de nombre
    const [selectedPersonal, setSelectedPersonal] = useState(null);
    const [personalsWithStatus, setPersonalsWithStatus] = useState([]);

    const { handleAsistencia, isLoading: isAsistenciaLoading, error: asistenciaError } = useAsistencia();

    useEffect(() => {
        fetchPersonals(); 
    }, []);

    useEffect(() => {
        const storedTimestamps = JSON.parse(localStorage.getItem('asistenciaTimestamps') || '{}');
        const updatedPersonals = personals.map(p => {
            const lastAsistencia = storedTimestamps[p.id];
            const isDisabled = lastAsistencia && (Date.now() - new Date(lastAsistencia.time).getTime()) < 86400000; // 24 horas
            const asistencia = isDisabled ? (lastAsistencia.estado === 'Ausente justificado' ? 'Pendiente' : lastAsistencia.estado) : 'Sin marcar';
            return { ...p, isDisabled, asistencia };
        });
        setPersonalsWithStatus(updatedPersonals);
    }, [personals]);

    const handleSelectionChange = useCallback((selectedPersonals) => {
        const selected = selectedPersonals.length > 0 ? selectedPersonals[0] : null;
        setSelectedPersonal(selected);
    }, []);

    const updatePersonalStatus = (id, estado) => {
        const storedTimestamps = JSON.parse(localStorage.getItem('asistenciaTimestamps') || '{}');
        storedTimestamps[id] = { time: new Date().toISOString(), estado };
        localStorage.setItem('asistenciaTimestamps', JSON.stringify(storedTimestamps));

        setPersonalsWithStatus(prevState =>
            prevState.map(p =>
                p.id === id ? { ...p, asistencia: estado === 'Ausente justificado' ? 'Pendiente' : estado, isDisabled: true } : p
            )
        );
    };

    const handleAsistenciaClick = async (id, estado) => {
        try {
            await handleAsistencia(id, estado);
            updatePersonalStatus(id, estado);
        } catch (error) {
            console.error('Error al manejar asistencia:', error);
        }
    };

    const columns = [
        { title: 'Nombre completo', field: 'nombreCompleto', width: 200 },
        { title: 'Teléfono', field: 'telefono', width: 200 },
        { title: 'Fecha', field: 'fechaIncorporacion', width: 200 },
        { title: 'Cargo', field: 'cargo', width: 200 },
        { title: 'Asistencia', field: 'asistencia', width: 200 },
        {
            title: 'Control de Asistencia',
            field: 'controlAsistencia',
            width: 300,
            formatter: (cell) => {
                const personalId = cell.getRow().getData().id;
                const isDisabled = cell.getRow().getData().isDisabled;
                return `
                    <div>
                        <button class="attendance-button" data-id="${personalId}" data-estado="Presente" ${isDisabled ? 'disabled' : ''}>Presente</button>
                        <button class="attendance-button" data-id="${personalId}" data-estado="Ausente" ${isDisabled ? 'disabled' : ''}>Ausente</button>
                        <button class="attendance-button" data-id="${personalId}" data-estado="Ausente justificado" ${isDisabled ? 'disabled' : ''}>Justificado</button>
                    </div>
                `;
            },
            cellClick: (e, cell) => {
                const estado = e.target.dataset.estado;
                const id = parseInt(e.target.dataset.id, 10);
                if (estado && id && !e.target.disabled) {
                    handleAsistenciaClick(id, estado);
                }
            }
        }
    ];

    const handleNameFilterChange = (e) => {
        setFilterName(e.target.value);
    };

    const filteredPersonals = personalsWithStatus.filter(personal =>
        personal.nombreCompleto.toLowerCase().includes(filterName.toLowerCase())
    );

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="top-table">
                    <h1 className="title-table">Control de Asistencia</h1>
                    <div className="filter-actions">
                        <Search
                            value={filterName}
                            onChange={handleNameFilterChange}
                            placeholder="Filtrar por nombre"
                        />
                    </div>
                </div>
                <Table
                    data={filteredPersonals}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                />
            </div>

            {asistenciaError && <p style={{ color: 'red' }}>Error al registrar asistencia: {asistenciaError}</p>}
        </div>
    );
};

export default Asistencias;
