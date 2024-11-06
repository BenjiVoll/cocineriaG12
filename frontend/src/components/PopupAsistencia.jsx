import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function AsistenciaPopup({ show, setShow, data, action }) {
   
    const asistenciaData = data && data.length > 0 ? data[0] : {};

    // Maneja el envío del formulario y ejecuta la función `action` pasando `formData`
    const handleSubmit = (formData) => {
        action(formData); // Llama la acción (por ejemplo, actualizar o agregar pedido)
        setShow(false);   // Cierra el popup después de guardar
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="close icon" />
                        </button>
                        <Form
                            title="Editar Asistencia"
                            fields={[
                                {
                                    label: "Estado de asistencia",
                                    name: "estado",
                                    fieldType: 'select',
                                    options: [
                                        { value: 'pendiente', label: 'Pendiente' },
                                        { value: 'en_proceso', label: 'En Proceso' },
                                        { value: 'completado', label: 'Completado' },
                                        { value: 'cancelado', label: 'Cancelado' },
                                    ],
                                    required: true,
                                    defaultValue: asistenciaData.estado || "",
                                },
                                {
                                    label: "Fecha de Entrega",
                                    name: "fechaEntrega",
                                    defaultValue: asistenciaData.fechaEntrega || "",
                                    placeholder: 'DD-MM-YYYY',
                                    fieldType: 'input',
                                    type: "date",
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Guardar Pedido"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
