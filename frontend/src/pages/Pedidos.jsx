import { useCallback, useState } from 'react';
import Table from '@components/TableOrder';
import useOrders from '@hooks/orders/useGetOrders';
import Search from '../components/Search';
import PopupOrder from '../components/PopupOrder';
import PopupAddOrder from '../components/PopupAddOrder';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import AddIcon from '../assets/addIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/orders.css';
import useEditOrder from '@hooks/orders/useEditOrder';
import useDeleteOrder from '@hooks/orders/useDeleteOrder';
import useAddOrder from '@hooks/orders/useAddOrder';

const Orders = () => {
  const { orders, fetchOrders, setOrders } = useOrders();
  const [filterOrderId, setFilterOrderId] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataOrder,
    setDataOrder,
  } = useEditOrder(fetchOrders, setOrders);

  const { handleDelete } = useDeleteOrder(fetchOrders, setDataOrder);
  
  const {
    handleAddOrder,
    handleClickAdd,
    isAddPopupOpen,
    setIsAddPopupOpen,
  } = useAddOrder(setOrders);

  const handleOrderIdFilterChange = (e) => {
    setFilterOrderId(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedOrders) => {
      setDataOrder(selectedOrders);
    },
    [setDataOrder]
  );

  const columns = [
    { title: "Producto", field: "productos", width: 200, responsive: 2 },
    { title: "Estado", field: "estado", width: 100, responsive: 2 },
    { title: "Método de Pago", field: "metodoPago", width: 200, responsive: 2 },
    { title: "Total", field: "precioTotal", width: 150, responsive: 2 },
  ];
  

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Pedidos</h1>
          <div className='filter-actions'>
            <Search value={filterOrderId} onChange={handleOrderIdFilterChange} placeholder={'Filtrar por Nombre de Pedido'} />
            <button onClick={handleClickAdd}>
              <img src={AddIcon} alt="add" width="20px"/>
            </button>
            <button onClick={handleClickUpdate} disabled={dataOrder.length === 0}>
              {dataOrder.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-order-button' disabled={dataOrder.length === 0} onClick={() => handleDelete(dataOrder)}>
              {dataOrder.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={orders}
          columns={columns}
          filter={filterOrderId}
          dataToFilter={'productos'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <PopupOrder 
        show={isPopupOpen} 
        setShow={setIsPopupOpen} 
        data={dataOrder} 
        action={handleUpdate} 
      />
      <PopupAddOrder 
        show={isAddPopupOpen} 
        setShow={setIsAddPopupOpen}
        action={handleAddOrder} 
      />
    </div>
  );
};

export default Orders;
