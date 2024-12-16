"use strict";
import Asistencia from "../entity/asistencia.entity.js";
import { AppDataSource } from "./configDb.js";

async function createAsistencias() {
  try {
    const asistenciaRepository = AppDataSource.getRepository(Asistencia);

    const count = await asistenciaRepository.count();
    if (count > 0) return; 

   
    const asistenciasToCreate = [
      {
        id: 1,
        estado: "Presente", 
        justificativo: Null,
        fecha: new Date("2024-01-20"),
        personal_id: 2,
        
      },
      {
        id: 1,
        estado: "Ausente", 
        justificativo: Null,
        personal_id: 2,
        fecha: new Date("2024-05-11"),
      },
      
    ];

    
    await Promise.all(asistenciasToCreate.map(asistenciaData => {
      const asistencia = asistenciaRepository.create(asistenciaData);
      return asistenciaRepository.save(asistencia);
    }));

    console.log("* => Pedidos creados exitosamente");
  } catch (error) {
    console.error("Error al crear pedidos:", error);
  }
}

export { createAsistencias };
