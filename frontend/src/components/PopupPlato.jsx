import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';

export function PopupAddPlato({ show, setShow, action }) {

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
                                {
                                    label: "Disponible",
                                    name: "disponible",
                                    fieldType: 'select',
                                    options: [
                                        { value: true, label: 'Sí' },
                                        { value: false, label: 'No' },
                                    ],
                                    required: true,
                                    defaultValue: "",
                                }
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
    };

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Editar plato"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                defaultValue: platoData.nombre || "",
                                placeholder: 'Nombre del plato',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 3,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Descripción",
                                name: "descripcion",
                                defaultValue: platoData.descripcion || "",
                                placeholder: 'Descripción del plato',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 10,
                                maxLength: 200,
                            },
                            {
                                label: "Precio",
                                name: "precio",
                                defaultValue: platoData.precio || "",
                                placeholder: 'Precio del plato',
                                fieldType: 'input',
                                type: "number",
                                required: true,
                                min: 0,
                                max: 100000,
                            },
                            {
                                label: "Disponible",
                                name: "disponible",
                                fieldType: 'select',
                                options: [
                                    { value: true, label: 'Sí' },
                                    { value: false, label: 'No' },
                                ],
                                required: true,
                                defaultValue: platoData.disponible !== undefined ? platoData.disponible : "",
                            }
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Editar plato"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}
