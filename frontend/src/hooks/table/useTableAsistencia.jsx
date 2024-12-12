import React, { useEffect, useRef } from 'react';
import Tabulator from 'tabulator-tables'; // Asegúrate de que Tabulator está correctamente importado

const TableAsistencia = ({ data, columns, onSelectionChange }) => {
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            const table = new Tabulator(tableRef.current, {
                data,
                columns,
                layout: "fitColumns",
                rowClick: (e, row) => {
                    if (onSelectionChange) {
                        onSelectionChange([row.getData()]);
                    }
                },
            });

            // Update table data on data change
            table.setData(data);

            return () => {
                table.destroy();
            };
        }
    }, [data, columns, onSelectionChange]);

    return <div ref={tableRef}></div>;
};

export default TableAsistencia;
