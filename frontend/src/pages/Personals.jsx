import { useCallback, useState } from 'react';
import Table from '@components/TablePersonal';
import usePersonals from '@hooks/personals/useGetPersonals';
import Search from '../components/Search';
import PopupPersonal from '../components/PopupPersonal';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import AddIcon from '../assets/addIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/personals.css';
import useEditPersonal from '@hooks/personals/useEditPersonal';
import useDeletePersonal from '@hooks/personals/useDeletePersonal';
import useAddPersonal from '@hooks/personals/useAddPersonal';
import AttendanceChart from '@components/AttendanceChart';
import AttendanceTable from '@components/AttendanceTable';

const Personals = () => {
    const { personals, fetchPersonals } = usePersonals();
    const [filterPersonalId, setFilterPersonalId] = useState('');
    const [selectedPersonal, setSelectedPersonal] = useState(null);

    const { handleEditPersonal, isPopupOpen, setIsPopupOpen, isLoading: isEditing, error: editError } = useEditPersonal(fetchPersonals);
    const { handleDelete, isDeleting, error: deleteError } = useDeletePersonal(fetchPersonals);
    const {
        handleSubmitNewPersonal,
        isAdding,
        isAddPopupOpen,
        setIsAddPopupOpen,
        newPersonalData,
        setNewPersonalData,
        error: addError,
    } = useAddPersonal(fetchPersonals);

    const handlePersonalIdFilterChange = (e) => {
        setFilterPersonalId(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedPersonals) => {
        const selected = selectedPersonals.length > 0 ? selectedPersonals[0] : null;
        setSelectedPersonal(selected);
    }, []);

    const handleEditButtonClick = () => {
        if (selectedPersonal) {
            setTimeout(() => {
                if (selectedPersonal) {
                    setIsPopupOpen(true);
                }
            }, 300);
        }
    };

    const handleAddButtonClick = () => {
        setIsAddPopupOpen(true);
        setNewPersonalData({
            nombreCompleto: '',
            telefono: '',
            fechaIncorporacion: '',
            cargo: '',
        });
    };

    const columns = [
        { title: 'Nombre completo', field: 'nombreCompleto', width: 200 },
        { title: 'Teléfono', field: 'telefono', width: 200 },
        { title: 'Fecha', field: 'fechaIncorporacion', width: 200 },
        { title: 'Cargo', field: 'cargo', width: 200 },
    ];

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="top-table">
                    <h1 className="title-table">Personal</h1>
                    <div className="filter-actions">
                        <Search
                            value={filterPersonalId}
                            onChange={handlePersonalIdFilterChange}
                            placeholder="Filtrar por ID de Personal"
                        />
                        <button onClick={handleAddButtonClick}>Agregar</button>
                        <button onClick={handleEditButtonClick} disabled={!selectedPersonal}>
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete([selectedPersonal])}
                            disabled={!selectedPersonal || isDeleting}
                        >
                            {selectedPersonal ? (
                                <img src={DeleteIcon} alt="delete" />
                            ) : (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={personals}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                />
            </div>

            {editError && <p style={{ color: 'red' }}>Error al editar: {editError}</p>}
            {deleteError && <p style={{ color: 'red' }}>Error al eliminar: {deleteError}</p>}
            {addError && <p style={{ color: 'red' }}>Error al agregar: {addError}</p>}

            <PopupPersonal
                show={isPopupOpen}
                setShow={setIsPopupOpen}
                data={selectedPersonal}
                action={(updatedData) => handleEditPersonal(selectedPersonal.id, updatedData)}
                isEdit
            />
            <PopupPersonal
                show={isAddPopupOpen}
                setShow={setIsAddPopupOpen}
                data={newPersonalData}
                action={handleSubmitNewPersonal}
                isEdit={false}
            />
        </div>
    );
};

export default Personals;
