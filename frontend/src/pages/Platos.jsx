import Table from '@components/TableMenu';
import usePlatos from '@hooks/platos/useGetPlatos.jsx';
import Search from '../components/Search';
import { PopupAddPlato, PopupEditPlato } from '@components/PopupPlato'; // Importa los popups desde popupPlato.jsx
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import AddIcon from '../assets/addIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/platos.css';
import useEditPlato from '@hooks/platos/useEditPlato';
import useDeletePlato from '@hooks/platos/useDeletePlato';
import useAddPlato from '@hooks/platos/useAddPlato';

const Platos = () => {
    const { platos, fetchPlatos, setPlatos } = usePlatos();
    const [filterNombre, setFilterNombre] = useState('');

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupEditOpen,
        setIsPopupEditOpen,
        dataPlato,
        setDataPlato,
    } = useEditPlato(fetchPlatos, setPlatos);

    const { handleDelete } = useDeletePlato(fetchPlatos, setDataPlato);

    const {
        isAddPopupOpen,
        setIsAddPopupOpen,
        handleAddPlato,
        handleClickAdd
    } = useAddPlato(fetchPlatos, setPlatos);

    const handleNombreFilterChange = (e) => {
        setFilterNombre(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedPlatos) => {
        setDataPlato(selectedPlatos);
    }, [setDataPlato]);

    const columns = [ 
        { title: "Nombre", field: "nombre", width: 350, responsive: 0 }, 
        { title: "Descripción", field: "descripcion", width: 300, responsive: 3 }, 
        { title: "Precio", field: "precio", width: 150, responsive: 2 }, 
        { title: "Disponible", field: "disponible", width: 150, responsive: 2 }, 
        { title: "Creado", field: "createdAt", width: 200, responsive: 2 }, 
        { title: "Ingredientes", field: "ingredientes", width: 200, responsive: 2 },
    ];
    

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Platos</h1>
                    <div className='filter-actions'>
                        <Search value={filterNombre} onChange={handleNombreFilterChange} placeholder={'Filtrar por nombre'} />
                        <button onClick={handleClickAdd}>
                            <img src={AddIcon} alt="add" />
                        </button>
                        <button onClick={handleClickUpdate} disabled={dataPlato.length === 0}>
                            {dataPlato.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className='delete-plato-button' disabled={dataPlato.length === 0} onClick={() => handleDelete(dataPlato)}>
                            {dataPlato.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={platos}
                    columns={columns}
                    filter={filterNombre}
                    dataToFilter={'nombre'}
                    initialSortName={'nombre'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <PopupEditPlato show={isPopupEditOpen} setShow={setIsPopupEditOpen} data={dataPlato} action={handleUpdate} />
            <PopupAddPlato show={isAddPopupOpen} setShow={setIsAddPopupOpen} action={handleAddPlato} />
        </div>
    );
};

export default Platos;
