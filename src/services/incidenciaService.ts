import { IncidenciaModel, IIncidencia } from "../models/incidencia";
import { ServiceError } from "../utils/errors";

export interface CrearIncidenciaDto {
    nombre: string;
    email: string;
    telefono?: string;
    asunto: string;
    mensaje: string;
}

export const create = async (data: CrearIncidenciaDto): Promise<IIncidencia> => {
    try {
        const incidencia = new IncidenciaModel(data);
        return await incidencia.save();
    } catch {
        throw ServiceError("Error al crear la incidencia");
    }
};

export const getAll = async (): Promise<IIncidencia[]> => {
    try {
        return await IncidenciaModel.find().sort({ createdAt: -1 });
    } catch {
        throw ServiceError("Error al obtener las incidencias");
    }
};

export const getById = async (id: string): Promise<IIncidencia | null> => {
    try {
        return await IncidenciaModel.findById(id);
    } catch {
        throw ServiceError("Error al obtener la incidencia por ID");
    }
};
