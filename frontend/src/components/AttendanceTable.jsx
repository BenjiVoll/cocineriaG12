import React from 'react';

const AttendanceTable = ({ data }) => {
    console.log("Datos recibidos en AttendanceTable:", data);

    if (!data || !data.asistencia) {
        return <p>No hay datos de asistencia disponibles para mostrar.</p>;
    }

    return (
        <div className="attendance-table">
            <h2>Historial de Asistencia de {data.nombreCompleto}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Presente</th>
                        <th>Ausente</th>
                        <th>Ausente Justificado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.asistencia.presente}</td>
                        <td>{data.asistencia.ausente}</td>
                        <td>{data.asistencia.ausenteJustificado}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
