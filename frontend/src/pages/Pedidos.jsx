import { useCallback, useState } from 'react';
import Table from '@components/TableOrder';
import useOrders from '@hooks/orders/useGetOrders';
import Search from '../components/Search';
import Popup from '../components/PopupOrder';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import AddIcon from '../assets/addIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/orders.css';
import useEditOrder from '@hooks/orders/useEditOrder';
import useDeleteOrder from '@hooks/orders/useDeleteOrder';
import useAddOrder from '@hooks/orders/useAddOrder'; // Nuevo hook para añadir pedidos

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
  } = useEditOrder(setOrders);

  const { handleDelete } = useDeleteOrder(fetchOrders, setDataOrder);
  
  const {
    handleAddOrder,
    isAddPopupOpen,
    setIsAddPopupOpen,
    newOrderData,
    handleSubmitNewOrder
  } = useAddOrder(setOrders); // Funciones y estados para añadir pedidos

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
    { title: "ID", field: "id", width: 100, responsive: 0 },
    { title: "Productos", field: "productos", width: 200, responsive: 2 },
    { title: "Estado", field: "estado", width: 200, responsive: 2 },
    { title: "Entrega Pedido", field: "fechaEntrega", width: 200, responsive: 2 },
    { title: "Método de Pago", field: "metodoPago", width: 200, responsive: 2 },
    { title: "Total", field: "precioTotal", width: 150, responsive: 2 },
  ];
  

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Pedidos</h1>
          <div className='filter-actions'>
            <Search value={filterOrderId} onChange={handleOrderIdFilterChange} placeholder={'Filtrar por ID de Pedido'} />
            <button onClick={handleAddOrder}>
              <img src={AddIcon} alt="add" />
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
          dataToFilter={'id'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup 
        show={isPopupOpen} 
        setShow={setIsPopupOpen} 
        data={dataOrder} 
        action={handleUpdate} 
      />
      <Popup 
        show={isAddPopupOpen} 
        setShow={setIsAddPopupOpen} 
        data={newOrderData} 
        action={handleSubmitNewOrder} 
      />
    </div>
  );
};

export default Orders;
