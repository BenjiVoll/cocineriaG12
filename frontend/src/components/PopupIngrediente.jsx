import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export function PopupAddIngrediente({ show, setShow, action }) {

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
                                }
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
                        title="Editar Ingrediente"
                        fields={[
                            {
                                label: "Nombre del Ingrediente",
                                name: "nombre",
                                defaultValue: ingredienteData.nombre || "",
                                placeholder: 'Nombre del ingrediente',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 3,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Cantidad",
                                name: "cantidad",
                                defaultValue: ingredienteData.cantidad || "",
                                placeholder: 'Cantidad del ingrediente',
                                fieldType: 'input',
                                type: "number",
                                required: true,
                                min: 0,
                                max: 100000,
                            }
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Editar Ingrediente"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}
