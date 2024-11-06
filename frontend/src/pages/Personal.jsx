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

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataPersonal,
    setDataPersonal,
  } = useEditPersonal(setPersonals);

  const { handleDelete } = useDeletePersonal(fetchPersonals, setDataPersonal);
  
  const {
    handleAddPersonal,
    isAddPopupOpen,
    setIsAddPopupOpen,
    newPersonalData,
    handleSubmitNewPersonal
  } = useAddPersonal(setPersonals); 

  const handlePersonalIdFilterChange = (e) => {
    setFilterPersonalId(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedPersonals) => {
      setDataPersonal(selectedPersonals);
    },
    [setDataPersonal]
  );

  const columns = [
    { title: "ID", field: "id", width: 100, responsive: 0 },
    { title: "Nombre completo", field: "nombre_Completo", width: 200, responsive: 2 },
    { title: "Telefono", field: "telefono", width: 200, responsive: 2 },
    { title: "fecha", field: "fechaIncorporacion", width: 200, responsive: 2 },
    { title: "cargo", field: "cargo", width: 200, responsive: 2 },
    { title: "creado en", field: "CreatedAt", width: 200, responsive: 2 }, 
    { title: "actualizado", field: "updatedAt", width: 200, responsive: 2 },                             
  ];
  

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Personal</h1>
          <div className='filter-actions'>
            <Search value={filterPersonalId} onChange={handlePersonalIdFilterChange} placeholder={'Filtrar por ID de Personal'} />
            <button onClick={handleAddPersonal}>
              <img src={AddIcon} alt="add" />
            </button>
            <button onClick={handleClickUpdate} disabled={dataPersonal.length === 0}>
              {dataPersonal.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-tpersonal-button' disabled={dataPersonal.length === 0} onClick={() => handleDelete(dataPersonal)}>
              {dataPersonal.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
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
        data={dataPersonal} 
        action={handleUpdate} 
      />
      <Popup 
        show={isAddPopupOpen} 
        setShow={setIsAddPopupOpen} 
        data={newPersonalData} 
        action={handleSubmitNewPersonal} 
      />
    </div>
  );
};

export default Personals;
