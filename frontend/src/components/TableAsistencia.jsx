import React, { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

const TableAsistencia = ({ data, columns, onSelectionChange }) => {
    const tableRef = useRef(null);
    const tableInstance = useRef(null);

    useEffect(() => {
        // Verificar que los datos y las columnas estén correctos
        if (!data || data.length === 0) {
            console.log('No hay datos disponibles para mostrar');
            return;
        }
        if (!columns || columns.length === 0) {
            console.log('No se han definido las columnas');
            return;
        }

        // Asegúrate de destruir la tabla anterior si existe
        if (tableInstance.current) {
            console.log('Destruyendo la tabla previa...');
            tableInstance.current.destroy();
            tableInstance.current = null;
        }

        if (tableRef.current && columns.length > 0) {
            console.log('Inicializando nueva tabla...');
            tableInstance.current = new Tabulator(tableRef.current, {
                data: data || [], // Configurar los datos iniciales al construir la tabla
                columns: columns,
                layout: "fitColumns",
                rowClick: (e, row) => {
                    if (onSelectionChange) {
                        console.log('Seleccionando fila: ', row.getData());
                        onSelectionChange([row.getData()]);
                    }
                },
            });

            // Cleanup al desmontar el componente
            return () => {
                if (tableInstance.current) {
                    console.log('Destruyendo la tabla al desmontar el componente...');
                    tableInstance.current.destroy();
                    tableInstance.current = null;
                }
            };
        }
    }, [columns, data]); // Agregar `data` como dependencia

    return <div id="example-table" ref={tableRef}></div>;
};

export default TableAsistencia;
