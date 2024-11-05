import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function OrderPopup({ show, setShow, data, action }) {
    const orderData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} alt="close icon" />
                    </button>
                    <Form
                        title="Editar Pedido"
                        fields={[
                            {
                                label: "Estado del Pedido",
                                name: "estado",
                                fieldType: 'select',
                                options: [
                                    { value: 'pendiente', label: 'Pendiente' },
                                    { value: 'en_proceso', label: 'En Proceso' },
                                    { value: 'completado', label: 'Completado' },
                                    { value: 'cancelado', label: 'Cancelado' },
                                ],
                                required: true,
                                defaultValue: orderData.estado || "",
                            },
                            {
                                label: "Fecha de Entrega",
                                name: "fechaEntrega",
                                defaultValue: orderData.fechaEntrega || "",
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
