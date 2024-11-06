import Table from '@components/Table';
import useGetPersonal from '@hooks/asistencias/useGetPersonal'; // Este hook necesita ser creado
import Search from '@components/Search';
import '@styles/personal.css'; // Asegúrate de tener estilos adecuados para Personal

const Personal = () => {
    const { asistencias, loading } = useGetPersonal();

    const columns = [
        { title: "Nombre Completo", field: "nombreCompleto", width: 200, responsive: 0 },
        { title: "Teléfono", field: "telefono", width: 150, responsive: 1 },
        { title: "Fecha de Incorporación", field: "fechaIncorporacion", format: data => data ? new Date(data).toLocaleDateString() : '', width: 150, responsive: 1 },
        { title: "Cargo", field: "cargo", width: 150, responsive: 1 },
        { title: "Fecha Creación", field: "createdAt", format: data => new Date(data).toLocaleString(), width: 200, responsive: 2 },
        { title: "Última Actualización", field: "updatedAt", format: data => new Date(data).toLocaleString(), width: 200, responsive: 2 }
    ];

    if (loading) return <p>Cargando datos...</p>;

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Personal</h1>
                    <Search placeholder='Buscar por nombre'/>
                </div>
                <Table
                    data={asistencias}
                    columns={columns}
                    initialSortName={'nombreCompleto'}
                />
            </div>
        </div>
    );
};

export default Personal;