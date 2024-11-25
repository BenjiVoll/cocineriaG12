import Table from '@components/Table';
import useIngredientes from '@hooks/ingredientes/useGetIngredientes.jsx';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import '@styles/ingredientes.css';
import useEditIngrediente from '@hooks/ingredientes/useEditIngrediente';
import useDeleteIngrediente from '@hooks/ingredientes/useDeleteIngrediente';

const Ingredientes = () => {
    const { ingredientes, fetchIngredientes, setIngredientes } = useIngredientes();
    const [filterNombre, setFilterNombre] = useState('');

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataIngrediente,
        setDataIngrediente
    } = useEditIngrediente(setIngredientes);

    const { handleDelete } = useDeleteIngrediente(fetchIngredientes, setDataIngrediente);

    const handleNombreFilterChange = (e) => {
        setFilterNombre(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedIngredientes) => {
        setDataIngrediente(selectedIngredientes);
    }, [setDataIngrediente]);

    const columns = [
        { title: "Nombre", field: "nombre", width: 350, responsive: 0 },
        { title: "Cantidad", field: "cantidad", width: 150, responsive: 2 },
        { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Ingredientes</h1>
                    <div className='filter-actions'>
                        <Search value={filterNombre} onChange={handleNombreFilterChange} placeholder={'Filtrar por nombre'} />
                        <button onClick={handleClickUpdate} disabled={dataIngrediente.length === 0}>
                            {dataIngrediente.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className='delete-ingrediente-button' disabled={dataIngrediente.length === 0} onClick={() => handleDelete(dataIngrediente)}>
                            {dataIngrediente.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={ingredientes}
                    columns={columns}
                    filter={filterNombre}
                    dataToFilter={'nombre'}
                    initialSortName={'nombre'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataIngrediente} action={handleUpdate} />
        </div>
    );
};

export default Ingredientes;