import React, { useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

const TableAsistencia = ({ data, columns, onSelectionChange }) => {
    const tableRef = useRef(null);
    const tableInstance = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) {
            return;
        }
        if (!columns || columns.length === 0) {
            return;
        }

        if (tableInstance.current) {
            tableInstance.current.destroy();
            tableInstance.current = null;
        }

        if (tableRef.current && columns.length > 0) {
            tableInstance.current = new Tabulator(tableRef.current, {
                data: data || [],
                columns: columns,
                layout: "fitColumns",
                rowClick: (e, row) => {
                    if (onSelectionChange) {
                        onSelectionChange([row.getData()]);
                    }
                },
            });

            return () => {
                if (tableInstance.current) {
                    tableInstance.current.destroy();
                    tableInstance.current = null;
                }
            };
        }
    }, [columns, data]);

    return <div id="example-table" ref={tableRef}></div>;
};

export default TableAsistencia;
