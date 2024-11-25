import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupAddIngrediente({ show, setShow, action }) {

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
                            title="Agregar Ingrediente"
                            fields={[
                                {
                                    label: "Nombre del Ingrediente",
                                    name: "nombre",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    defaultValue: "",
                                },
                                {
                                    label: "Cantidad",
                                    name: "cantidad",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    defaultValue: "",
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Agregar Ingrediente"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export function PopupEditIngrediente({ show, setShow, data, action }) {

    const ingredienteData = data && data.length > 0 ? data[0] : {};

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
                            title="Editar Ingrediente"
                            fields={[
                                {
                                    label: "Nombre del Ingrediente",
                                    name: "nombre",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    defaultValue: ingredienteData.nombre || "",
                                },
                                {
                                    label: "Cantidad",
                                    name: "cantidad",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    defaultValue: ingredienteData.cantidad || "",
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