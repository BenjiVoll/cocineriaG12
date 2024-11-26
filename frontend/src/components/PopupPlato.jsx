import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupAddPlato({ show, setShow, action }) {

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
                            title="Agregar Plato"
                            fields={[
                                {
                                    label: "Nombre del Plato",
                                    name: "nombre",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    defaultValue: "",
                                },
                                {
                                    label: "Descripción",
                                    name: "descripcion",
                                    fieldType: 'textarea',
                                    required: true,
                                    defaultValue: "",
                                },
                                {
                                    label: "Precio",
                                    name: "precio",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    defaultValue: "",
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Agregar Plato"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
export function PopupEditPlato({ show, setShow, data, action }) {

    const platoData = data && data.length > 0 ? data[0] : {};

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
                            title="Editar Plato"
                            fields={[
                                {
                                    label: "Nombre del Plato",
                                    name: "nombre",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    defaultValue: platoData.nombre || "",
                                },
                                {
                                    label: "Descripción",
                                    name: "descripcion",
                                    fieldType: 'textarea',
                                    required: true,
                                    defaultValue: platoData.descripcion || "",
                                },
                                {
                                    label: "Precio",
                                    name: "precio",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    defaultValue: platoData.precio || "",
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Guardar Cambios"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}