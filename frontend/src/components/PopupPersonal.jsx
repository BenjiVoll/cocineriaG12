import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupPersonal({ show, setShow, data, action, fetchPersonals }) {
    
    const personalData = data && data.id ? data : {};

    
    const handleSubmit = (formData) => {
        if (personalData.id) {
            action(personalData.id, formData, () => {
                fetchPersonals();  
                setShow(false);  
            });
        } else {
            console.error("ID del personal no disponible para la edición");
        }
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        {}
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar" />
                        </button>

                        {}
                        <Form
                            title="Editar Personal"
                            fields={[
                                {
                                    label: "Nombre Completo",
                                    name: "nombreCompleto",
                                    defaultValue: personalData.nombreCompleto || "",
                                    placeholder: "Nombre Completo",
                                    fieldType: "input",
                                    required: true,
                                },
                                {
                                    label: "Teléfono",
                                    name: "telefono",
                                    defaultValue: personalData.telefono || "",
                                    placeholder: "Teléfono",
                                    fieldType: "input",
                                    required: true,
                                },
                                {
                                    label: "Fecha de Incorporación",
                                    name: "fechaIncorporacion",
                                    defaultValue: personalData.fechaIncorporacion || "",
                                    placeholder: "DD-MM-YYYY",
                                    fieldType: "input",
                                    type: "date",
                                    required: true,
                                },
                                {
                                    label: "Cargo",
                                    name: "cargo",
                                    defaultValue: personalData.cargo || "",
                                    placeholder: "Cargo",
                                    fieldType: "input",
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Guardar Cambios"
                            backgroundColor={"#fff"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
