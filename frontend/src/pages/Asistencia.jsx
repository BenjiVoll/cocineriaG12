import { useCallback, useState } from 'react';
import Table from '@components/TableAsistencia';
import useAsistencias from '@hooks/asistencias/useGetAsistencias';
import Search from '../components/Search';
import Popup from '../components/PopupAsistencia';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import AddIcon from '../assets/addIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/asistencias.css';
import useEditAsistencia from '@hooks/asistencias/useEditAsistencia';
import useDeleteAsistencia from '@hooks/asistencias/useDeleteAsistencia';
import useAddAsistencia from '@hooks/asistencias/useAddAsistencia'; 

const Asistencias = () => {
  const { asistencias, fetchAsistencias, setAsistencias } = useAsistencias();
  const [filterAsistenciaId, setFilterAsistenciaId] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataAsistencia,
    setDataAsistencia,
  } = useEditAsistencia(setAsistencias);

  const { handleDelete } = useDeleteAsistencia(fetchAsistencias, setDataAsistencia);
  
  const {
    handleAddAsistencia,
    isAddPopupOpen,
    setIsAddPopupOpen,
    newAsistenciaData,
    handleSubmitNewAsistencia
  } = useAddAsistencia(setAsistencias); 

  const handleAsistenciaIdFilterChange = (e) => {
    setFilterAsistenciaId(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedAsistencias) => {
      setDataAsistencia(selectedAsistencias);
    },
    [setDataAsistencia]
  );

  const columns = [
    { title: "ID", field: "id", width: 100, responsive: 0 },
    { title: "estado", field: "estado", width: 200, responsive: 2 },
    { title: "justificativo", field: "justificativo", width: 200, responsive: 2 },
    { title: "fecha", field: "fecha", width: 200, responsive: 2 },
    { title: "personal id", field: "personal_id", width: 200, responsive: 2 },
    { title: "nombre completo", field: "nombreCompleto", width: 200, responsive: 2 }, // Nuevo campo
    { title: "telefono", field: "telefono", width: 200, responsive: 2 },             // Nuevo campo
    { title: "cargo", field: "cargo", width: 200, responsive: 2 }                    // Nuevo campo
  ];
  

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Asistencia</h1>
          <div className='filter-actions'>
            <Search value={filterAsistenciaId} onChange={handleAsistenciaIdFilterChange} placeholder={'Filtrar por ID de Personal'} />
            <button onClick={handleAddAsistencia}>
              <img src={AddIcon} alt="add" />
            </button>
            <button onClick={handleClickUpdate} disabled={dataAsistencia.length === 0}>
              {dataAsistencia.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-asistencia-button' disabled={dataAsistencia.length === 0} onClick={() => handleDelete(dataAsistencia)}>
              {dataAsistencia.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={asistencias}
          columns={columns}
          filter={filterAsistenciaId}
          dataToFilter={'id'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup 
        show={isPopupOpen} 
        setShow={setIsPopupOpen} 
        data={dataAsistencia} 
        action={handleUpdate} 
      />
      <Popup 
        show={isAddPopupOpen} 
        setShow={setIsAddPopupOpen} 
        data={newAsistenciaData} 
        action={handleSubmitNewAsistencia} 
      />
    </div>
  );
};

export default Asistencias;
