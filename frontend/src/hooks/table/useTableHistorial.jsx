import { useRef, useEffect } from 'react';
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

const useTableHistorial = ({ data, columns, initialSortName }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      const table = new Tabulator(tableRef.current, {
        data,
        columns,
        layout: 'fitColumns',
        initialSort: [
          { column: initialSortName, dir: 'asc' } 
        ],
      });

     
      return () => {
        table.destroy();
      };
    }
  }, [data, columns, initialSortName]);

  return { tableRef };
};

export default useTableHistorial;
