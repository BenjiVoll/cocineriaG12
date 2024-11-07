<<<<<<< HEAD
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
=======
import Table from '@components/Table';
import useUsers from '@hooks/users/useGetUsers.jsx';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/users.css';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';

const Asistencia = () => {
  const { asistencia, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState('');
>>>>>>> rama_cocina_3

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
<<<<<<< HEAD
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
  
=======
    dataUser,
    setDataUser
  } = useEditUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedUsers) => {
    setDataUser(selectedUsers);
  }, [setDataUser]);

  const columns = [
    { title: "Nombre", field: "nombreCompleto", width: 350, responsive: 0 },
    { title: "Correo electrónico", field: "email", width: 300, responsive: 3 },
    { title: "Rut", field: "rut", width: 150, responsive: 2 },
    { title: "Rol", field: "rol", width: 200, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];
>>>>>>> rama_cocina_3

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Asistencia</h1>
          <div className='filter-actions'>
<<<<<<< HEAD
            <Search value={filterAsistenciaId} onChange={handleAsistenciaIdFilterChange} placeholder={'Filtrar por ID de Personal'} />
            <button onClick={handleAddAsistencia}>
              <img src={AddIcon} alt="add" />
            </button>
            <button onClick={handleClickUpdate} disabled={dataAsistencia.length === 0}>
              {dataAsistencia.length === 0 ? (
=======
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
            <button onClick={handleClickUpdate} disabled={dataUser.length === 0}>
              {dataUser.length === 0 ? (
>>>>>>> rama_cocina_3
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
<<<<<<< HEAD
            <button className='delete-asistencia-button' disabled={dataAsistencia.length === 0} onClick={() => handleDelete(dataAsistencia)}>
              {dataAsistencia.length === 0 ? (
=======
            <button className='delete-user-button' disabled={dataUser.length === 0} onClick={() => handleDelete(dataUser)}>
              {dataUser.length === 0 ? (
>>>>>>> rama_cocina_3
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
<<<<<<< HEAD
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
=======
          data={asistencia}
          columns={columns}
          filter={filterRut}
          dataToFilter={'rut'}
          initialSortName={'nombreCompleto'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} />
>>>>>>> rama_cocina_3
    </div>
  );
};

<<<<<<< HEAD
export default Asistencias;
=======
export default Asistencia;
>>>>>>> rama_cocina_3
