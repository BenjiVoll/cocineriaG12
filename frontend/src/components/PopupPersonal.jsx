import React, { useState, useEffect } from 'react';

const PopupPersonal = ({ show, setShow, data, action, isEdit }) => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        telefono: '',
        fechaIncorporacion: '',
        cargo: '',
    });

    const [errors, setErrors] = useState({});

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
    }, [data, isEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateNombreCompleto = (nombre) => {
        if (nombre.length < 3) {
            return 'El nombre completo debe tener al menos 3 caracteres.';
        }
        const regex = /^[A-ZÑ][a-zñ]*\s[A-ZÑ][a-zñ]*$/;
        if (!regex.test(nombre)) {
            return 'El nombre completo debe tener la primera letra en mayúscula y estar separado por un espacio.';
        }
        if (nombre.length > 100) {
            return 'El nombre completo no debe exceder los 100 caracteres.';
        }
        return '';
    };

    const validateTelefono = (telefono) => {
        if (!/^9\d{8}$/.test(telefono)) {
            return 'El teléfono debe tener exactamente 9 dígitos y empezar con 9.';
        }
        return '';
    };

    const validateFechaIncorporacion = (fecha) => {
        const fechaMin = new Date('2024-01-01');
        const fechaMax = new Date('2025-12-31');
        const fechaIngresada = new Date(fecha);
        if (fechaIngresada < fechaMin || fechaIngresada > fechaMax) {
            return 'La fecha de incorporación debe estar entre 2024 y 2025.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const validationErrors = {
            nombreCompleto: validateNombreCompleto(formData.nombreCompleto),
            telefono: validateTelefono(formData.telefono),
            fechaIncorporacion: validateFechaIncorporacion(formData.fechaIncorporacion),
        };

        
        if (Object.values(validationErrors).some(error => error !== '')) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const formattedData = {
            ...formData,
            cargo: formData.cargo.trim().toLowerCase(),
            fechaIncorporacion: formData.fechaIncorporacion,
        };

        try {
            await action(formattedData);
            setShow(false); 
        } catch (error) {
            console.error('Error al guardar:', error);
            if (error.response && error.response.data.message === "El teléfono ya está en uso.") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    telefono: 'El teléfono ya está en uso.',
                }));
            } else {
                alert('Error al guardar los datos. Inténtalo nuevamente.');
            }
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
                            style={{ 
                                borderColor: errors.nombreCompleto ? 'red' : 'initial', 
                                backgroundImage: 'none' 
                            }}
                        />
                        {errors.nombreCompleto && <p style={{ color: 'red' }}>{errors.nombreCompleto}</p>}
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
                            style={{ borderColor: errors.telefono ? 'red' : 'initial', backgroundImage: 'none' }}
                        />
                        {errors.telefono && <p style={{ color: 'red' }}>{errors.telefono}</p>}
                    </div>
                    <div className="form-group">
                        <label>Fecha de Incorporación</label>
                        <input
                            type="date"
                            name="fechaIncorporacion"
                            value={formData.fechaIncorporacion}
                            onChange={handleInputChange}
                            required
                            style={{ borderColor: errors.fechaIncorporacion ? 'red' : 'initial', backgroundImage: 'none' }}
                        />
                        {errors.fechaIncorporacion && <p style={{ color: 'red' }}>{errors.fechaIncorporacion}</p>}
                    </div>
                    <div className="form-group">
                        <label>Cargo</label>
                        <select
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleInputChange}
                            required
                            style={{ borderColor: errors.cargo ? 'red' : 'initial', backgroundImage: 'none' }}
                        >
                            <option value="">Seleccionar Cargo</option>
                            <option value="cocinero">Cocinero</option>
                            <option value="administrador">Administrador</option>
                            <option value="mesero">Mesero</option>
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
