import useTable from '@hooks/table/useTableOrder.jsx';

export default function Table({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange }) {
  const { tableRef } = useTable({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange });

  return (
    <div className='table-container-order'>
      <div ref={tableRef}></div>
    </div>
  );
}
