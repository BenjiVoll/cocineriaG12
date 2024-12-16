import React from 'react';
import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export function PopupAddIngrediente({ show, setShow, action }) {
    const fields = [
        {
            label: "Nombre del Ingrediente",
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
            label: "Cantidad",
            name: "cantidad",
            fieldType: 'input',
            type: "number",
            required: true,
            defaultValue: "",
            validate: {
                min: value => value >= 1 || 'La cantidad debe ser al menos 1',
            }
        }
    ];

    const handleFormSubmit = (data) => {
        action(data);
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
                            fields={fields}
                            onSubmit={handleFormSubmit}
                            buttonText="Agregar Ingrediente"
                            backgroundColor="#fff"
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
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/,
                                    patternMessage: "El nombre solo puede contener letras, números, espacios y acentos",
                                },
                                {
                                    label: "Cantidad",
                                    name: "cantidad",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    defaultValue: ingredienteData.cantidad || "",
                                    validate: {
                                        min: value => value >= 1 || 'La cantidad debe ser al menos 1',
                                    }
                                }
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Editar Ingrediente"
                            backgroundColor="#fff"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}