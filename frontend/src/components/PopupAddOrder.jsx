import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupAddOrder({ show, setShow, action }) {

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
                            title="Agregar Pedido"
                            fields={[
                                {
                                    label: "Productos",
                                    name: "productos",
                                    fieldType: 'textarea',
                                    defaultValue: "",
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
                                    defaultValue: "",
                                },
                                {
                                    label: "Precio Total",
                                    name: "precioTotal",
                                    fieldType: 'input',
                                    defaultValue: "",
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
                                    defaultValue: "",
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Agregar Pedido"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}