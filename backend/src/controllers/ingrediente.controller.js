"use strict";
<<<<<<< HEAD
import { 
  createIngredienteService,
  deleteIngredienteService,
  getIngredientesService,
  getIngredienteService,
  updateIngredienteService,
} from "../services/ingrediente.service.js";
import{
  ingredienteBodyValidation,
  ingredienteQueryValidation,
  ingredienteUpdateValidation,
} from "../validations/ingrediente.validation.js";
import { 
  handleErrorClient, 
  handleErrorServer,
  handleSuccess
} from "../handlers/responseHandlers.js";

export async function createIngredienteController(req, res) {
  try {
    const { error } = ingredienteBodyValidation.validate(req.body);
    if (error) {
      console.log("Error de validación:", error.details);
      return handleErrorClient(res, 400, error.message);
    }

    const [ingrediente, errorIngrediente] = await createIngredienteService(req.body);
    if (errorIngrediente) {
      console.log("Error al crear el ingrediente:", errorIngrediente);
      return handleErrorClient(res, 409, errorIngrediente);
    }

    console.log("Ingrediente creado exitosamente:", ingrediente);
    handleSuccess(res, 201, "Ingrediente creado exitosamente", ingrediente);
  } catch (error) {
    console.error("Error al crear el ingrediente:", error.message);
    handleErrorServer(res, 500, error.message);
  }
}

export async function getIngredienteController(req, res) {
  try {
    const [ingredientes, errorIngredientes] = await getIngredienteService();

    if (errorIngredientes) {
      console.log("Error al obtener los ingredientes:", errorIngredientes);
      return handleErrorClient(res, 404, errorIngredientes);
    }

    console.log("Ingredientes encontrados:", ingredientes);
    handleSuccess(res, 200, "Ingredientes encontrados", ingredientes);
  } catch (error) {
    console.error("Error al obtener los ingredientes:", error.message);
    handleErrorServer(res, 500, error.message);
  }
}

export async function getIngredientesController (req, res) {
  try {
    const ingredientes = await getIngredientesService();
    handleSuccess(res, ingredientes);
  } catch (error) {
    handleErrorServer(res, error);
  }
}

export async function updateIngredienteController(req, res) {
  try {
    const { error } = ingredienteUpdateValidation.validate(req.body);
    if (error) {
      console.log("Error de validación:", error.details);
      return handleErrorClient(res, 400, error.message);
    }

    const [ingrediente, errorIngrediente] = await updateIngredienteService(req.params.id, req.body);

    if (errorIngrediente) {
      console.log("Error al actualizar el ingrediente:", errorIngrediente);
      return handleErrorClient(res, 409, errorIngrediente);
    }

    console.log("Ingrediente actualizado exitosamente:", ingrediente);
    handleSuccess(res, 200, "Ingrediente actualizado exitosamente", ingrediente);
  } catch (error) {
    console.error("Error al actualizar el ingrediente:", error.message);
    handleErrorServer(res, 500, error.message);
  }
}
export async function deleteIngredienteController(req, res) {
  try {
    const { id } = req.params;

    const [ingrediente, errorIngrediente] = await deleteIngredienteService(id);

    if (errorIngrediente) {
      console.log("Error al eliminar el ingrediente:", errorIngrediente);
      return handleErrorClient(res, 404, errorIngrediente);
    }

    console.log("Ingrediente eliminado exitosamente:", ingrediente);
    handleSuccess(res, 200, "Ingrediente eliminado exitosamente", ingrediente);
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error.message);
    handleErrorServer(res, 500, error.message);
  }
}

=======
import { actualizarIngrediente, 
  crearIngrediente,
   obtenerIngredientes } from "../services/ingrediente.service.js";

export const crearIngredienteController = async (req, res) => {
  try {
    const ingrediente = await crearIngrediente(req.body);
    res.status(201).json(ingrediente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarIngredienteController = async (req, res) => {
  try {
    const ingrediente = await actualizarIngrediente(req.params.id, req.body);
    res.status(200).json(ingrediente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerIngredientesController = async (req, res) => {
  try {
    const ingredientes = await obtenerIngredientes();
    res.status(200).json(ingredientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
>>>>>>> rama_cocina_3
