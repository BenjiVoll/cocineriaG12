import { useCallback, useState } from 'react';
import Table from '@components/TablePersonal';
import usePersonals from '@hooks/personals/useGetPersonals';
import Search from '../components/Search';
import Popup from '../components/PopupPersonal';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import AddIcon from '../assets/addIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/personals.css';
import useEditPersonal from '@hooks/personals/useEditPersonal';
import useDeletePersonal from '@hooks/personals/useDeletePersonal';
import useAddPersonal from '@hooks/personals/useAddPersonal';

const Personals = () => {
  const { personals, fetchPersonals, setPersonals } = usePersonals();
  const [filterPersonalId, setFilterPersonalId] = useState('');
  const [selectedPersonal, setSelectedPersonal] = useState(null);

  const {
    handleEditPersonal,
    isEditing,
    isPopupOpen,  
    setIsPopupOpen,  
  } = useEditPersonal();

  const { handleDelete } = useDeletePersonal(fetchPersonals);

  const {
    handleAddPersonal,
    isAddPopupOpen,
    setIsAddPopupOpen,
    newPersonalData,
    handleSubmitNewPersonal,
  } = useAddPersonal(setPersonals);

  const handlePersonalIdFilterChange = (e) => {
    setFilterPersonalId(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedPersonals) => {
    const selected = selectedPersonals.length > 0 ? selectedPersonals[0] : null;
    setSelectedPersonal(selected);
    console.log('Personal seleccionado:', selected);  
  }, []);

  const handleEditButtonClick = () => {
    if (selectedPersonal && selectedPersonal.id) {  
      setIsPopupOpen(true);
      console.log("Popup abierto para editar:", selectedPersonal);  
    } else {
      console.warn("No se seleccionó ningún personal con ID válido para editar.");
    }
  };

  const columns = [
    { title: 'ID', field: 'id', width: 100, responsive: 0 },
    { title: 'Nombre completo', field: 'nombreCompleto', width: 200, responsive: 2 },
    { title: 'Teléfono', field: 'telefono', width: 200, responsive: 2 },
    { title: 'Fecha', field: 'fechaIncorporacion', width: 200, responsive: 2 },
    { title: 'Cargo', field: 'cargo', width: 200, responsive: 2 },
    { title: 'Creado en', field: 'CreatedAt', width: 200, responsive: 2 },
    { title: 'Actualizado', field: 'updatedAt', width: 200, responsive: 2 },
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
              placeholder={'Filtrar por ID de Personal'}
            />
            <button onClick={handleAddPersonal}>
              <img src={AddIcon} alt="add" />
            </button>
            <button onClick={handleEditButtonClick} disabled={!selectedPersonal || !selectedPersonal.id}>
              {selectedPersonal && selectedPersonal.id ? (
                <img src={UpdateIcon} alt="edit" />
              ) : (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              )}
            </button>
            <button
              className="delete-tpersonal-button"
              disabled={!selectedPersonal || !selectedPersonal.id}
              onClick={() => handleDelete([selectedPersonal])}
            >
              {selectedPersonal && selectedPersonal.id ? (
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
          filter={filterPersonalId}
          dataToFilter={'id'}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <Popup
        show={isPopupOpen}  
        setShow={setIsPopupOpen}  
        data={selectedPersonal ? [selectedPersonal] : []}
        action={handleEditPersonal}  
        fetchPersonals={fetchPersonals}
      />

      <Popup
        show={isAddPopupOpen}
        setShow={setIsAddPopupOpen}
        data={newPersonalData}
        action={handleSubmitNewPersonal}
        fetchPersonals={fetchPersonals}
      />
    </div>
  );
};

export default Personals;
