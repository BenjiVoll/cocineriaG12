import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupOrder({ show, setShow, data, action }) {
    const orderData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
        setShow(false);   
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
                            title="Editar Pedido"
                            fields={[
                                {
                                    label: "",
                                    name: "id",
                                    fieldType: 'input',
                                    type: 'hidden',
                                    defaultValue: orderData.id || "",
                                    required: false,
                                },
                                {
                                    label: "Productos",
                                    name: "productos",
                                    fieldType: 'textarea',
                                    defaultValue: orderData.productos || "",
                                    required: true,
                                },
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
                                    label: "Precio Total",
                                    name: "precioTotal",
                                    fieldType: 'input',
                                    defaultValue: orderData.precioTotal || "",
                                    required: true,
                                    type: "number",
                                },
                                {
                                    label: "Método de Pago",
                                    name: "metodoPago",
                                    fieldType: 'select',
                                    options: [
                                        { value: 'tarjeta', label: 'Tarjeta' },
                                        { value: 'efectivo', label: 'Efectivo' },
                                        { value: 'paypal', label: 'PayPal' },
                                    ],
                                    required: true,
                                    defaultValue: orderData.metodoPago || "",
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
