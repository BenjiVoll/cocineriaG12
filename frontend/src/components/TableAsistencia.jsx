import React, { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

const TableAsistencia = ({ data, columns, onSelectionChange }) => {
    const tableRef = useRef(null);
    const tableInstance = useRef(null);

    useEffect(() => {
      
        if (!data || data.length === 0) {
            console.log('No hay datos disponibles para mostrar');
            return;
        }
        if (!columns || columns.length === 0) {
            console.log('No se han definido las columnas');
            return;
        }

       
        if (tableInstance.current) {
            console.log('Destruyendo la tabla previa...');
            tableInstance.current.destroy();
            tableInstance.current = null;
        }

        if (tableRef.current && columns.length > 0) {
            console.log('Inicializando nueva tabla...');
            tableInstance.current = new Tabulator(tableRef.current, {
                data: data || [], 
                columns: columns,
                layout: "fitColumns",
                rowClick: (e, row) => {
                    if (onSelectionChange) {
                        console.log('Seleccionando fila: ', row.getData());
                        onSelectionChange([row.getData()]);
                    }
                },
            });

            
            return () => {
                if (tableInstance.current) {
                    console.log('Destruyendo la tabla al desmontar el componente...');
                    tableInstance.current.destroy();
                    tableInstance.current = null;
                }
            };
        }
    }, [columns, data]); 

    return <div id="example-table" ref={tableRef}></div>;
};

export default TableAsistencia;
