"use strict";
import { 
  createPlatoService,
  deletePlatoService,
  getPlatosService,
  getPlatoService,
  updatePlatoService,
} from "../services/plato.service.js";
import{
  platoBodyValidation,
  platoQueryValidation,
  platoUpdateValidation,
} from "../validations/plato.validation.js";
import { 
  handleErrorClient, 
  handleErrorServer,
  handleSuccess
} from "../handlers/responseHandlers.js";

export async function createPlatoController(req, res) {
  try {
    const { error } = platoBodyValidation.validate(req.body);
    if (error) {
      return handleErrorClient(res, 400, error.message);
    }

    const [plato, errorPlato] = await createPlatoService(req.body);

    if (errorPlato) {
      return handleErrorClient(res, 409, errorPlato);
    }
    handleSuccess(res, 201, "Plato creado exitosamente", plato);
  } catch (error) {
    console.error("Error al crear el plato:", error.message);
    handleErrorServer(res, 500, error.message);
  }
}

export async function updatePlatoController(req, res) {
  try {
    const { error } = platoUpdateValidation.validate(req.body);
    if (error) {
      console.log("Error de validación:", error.details);
      return handleErrorClient(res, 400, error.message);
    }

    const [plato, errorPlato] = await updatePlatoService(req.params.id, req.body);

    if (errorPlato) {
      console.log("Error al actualizar el plato:", errorPlato);
      return handleErrorClient(res, 409, errorPlato);
    }

    console.log("Plato actualizado exitosamente:", plato);
    handleSuccess(res, 200, "Plato actualizado exitosamente", plato);
  } catch (error) {
    console.error("Error al actualizar el plato:", error.message);
    handleErrorServer(res, 500, error.message);
  }
}



export async function getPlatoController(req, res) {
  try {
    const [platos, errorPlatos] = await getPlatoService();

    if (errorPlatos) {
      console.log("Error al obtener los platos:", errorPlatos);
      return handleErrorClient(res, 404, errorPlatos);
    }

    handleSuccess(res, 200, "Platos encontrados", platos);
  } catch (error) {
    console.error("Error al obtener los platos:", error.message);
    handleErrorServer(res, 500, error.message);
  }
}

export async function getPlatosController (req, res) {
  try {
    const platos = await getPlatosService();
    handleSuccess(res, platos);
  } catch (error) {
    handleErrorServer(res, error);
  }
}

export async function deletePlatoController(req, res) {
  try {
    const { id } = req.params;

    const [plato, errorPlato] = await deletePlatoService(id);

    if (errorPlato) {
      console.log("Error al eliminar el plato:", errorPlato);
      return handleErrorClient(res, 404, errorPlato);
    }

    console.log("Plato eliminado exitosamente:", plato);
    handleSuccess(res, 200, "Plato eliminado exitosamente", plato);
  } catch (error) {
    console.error("Error al eliminar el plato:", error.message);
    handleErrorServer(res, 500, error.message);
  }
}

