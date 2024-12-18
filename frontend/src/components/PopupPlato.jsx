import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

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
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/,
                                    patternMessage: "El nombre solo puede contener letras, números, espacios y acentos",
                                },
                                {
                                    label: "Descripción",
                                    name: "descripcion",
                                    fieldType: 'textarea',
                                    required: true,
                                    defaultValue: "",
                                    minLength: 10,
                                    maxLength: 255,
                                    pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ,]+$/,
                                    patternMessage: "La descripción solo puede contener letras, números, espacios y acentos",
                                },
                                {
                                    label: "Precio",
                                    name: "precio",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    defaultValue: "",
                                    validate: {
                                        positive: value => value > 0 || 'El precio debe ser un número positivo',
                                        min: value => value >= 100 || 'El precio debe ser al menos 100 CLP',
                                        max: value => value <= 1000000 || 'El precio no puede exceder 1.000.000 CLP'
                                    }
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
                                pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/,
                                patternMessage: "El nombre solo puede contener letras, números, espacios y acentos",
                            },
                            {
                                label: "Descripción",
                                name: "descripcion",
                                defaultValue: platoData.descripcion || "",
                                placeholder: 'Descripción del plato',
                                fieldType: 'textarea',
                                required: true,
                                minLength: 10,
                                maxLength: 255,
                                pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ,]+$/,
                                patternMessage: "La descripción solo puede contener letras, números, espacios y acentos",
                            },
                            {
                                label: "Precio",
                                name: "precio",
                                defaultValue: platoData.precio || "",
                                placeholder: 'Precio del plato',
                                fieldType: 'input',
                                type: "number",
                                required: true,
                                validate: {
                                    positive: value => value > 0 || 'El precio debe ser un número positivo',
                                    min: value => value >= 100 || 'El precio debe ser al menos 100 CLP',
                                    max: value => value <= 1000000 || 'El precio no puede exceder 1.000.000 CLP'
                                }
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
