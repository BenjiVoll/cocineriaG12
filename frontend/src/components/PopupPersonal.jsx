import React, { useState, useEffect } from 'react';

const PopupPersonal = ({ show, setShow, data, action, isEdit }) => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        telefono: '',
        fechaIncorporacion: '',
        cargo: '',
    });

    useEffect(() => {
        if (isEdit && data) {
            setFormData({
                nombreCompleto: data.nombreCompleto || '',
                telefono: data.telefono || '',
                fechaIncorporacion: data.fechaIncorporacion || '',
                cargo: data.cargo || '',
            });
        } else {
            setFormData({
                nombreCompleto: '',
                telefono: '',
                fechaIncorporacion: '',
                cargo: '',
            });
        }
        console.log("Formulario inicializado:", formData);
    }, [data, isEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input cambiado: ${name} = ${value}`);
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados antes de formatear:", formData);

        if (!formData.nombreCompleto || !formData.telefono || !formData.fechaIncorporacion || !formData.cargo) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const formattedData = {
            ...formData,
            cargo: formData.cargo.trim().toLowerCase(),
            fechaIncorporacion: formData.fechaIncorporacion,
        };

        console.log("Datos formateados para envío:", formattedData);

        try {
            console.log("Llamando a la acción con:", formattedData);
            await action(formattedData);
            console.log("Datos enviados a la acción:", formattedData);
            setShow(false); // Cierra el popup
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar los datos. Inténtalo nuevamente.');
        }
    };

    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{isEdit ? 'Editar Personal' : 'Agregar Personal'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <input
                            type="text"
                            name="nombreCompleto"
                            value={formData.nombreCompleto}
                            onChange={handleInputChange}
                            placeholder="Nombre Completo"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            placeholder="Teléfono"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Incorporación</label>
                        <input
                            type="date"
                            name="fechaIncorporacion"
                            value={formData.fechaIncorporacion}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Cargo</label>
                        <select
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccionar Cargo</option>
                            <option value="cocinero">Cocinero</option>
                            <option value="administrador">Administrador</option>
                            <option value="garzon">Garzón</option>
                        </select>
                    </div>
                    <button type="submit">{isEdit ? 'Guardar Cambios' : 'Agregar'}</button>
                    <button type="button" onClick={() => setShow(false)}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default PopupPersonal;
