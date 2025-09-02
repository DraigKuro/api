import { IncidenciaModel, IIncidencia } from "../models/incidencia";

export interface CrearIncidenciaDto {
    nombre: string;
    email: string;
    telefono?: string;
    asunto: string;
    mensaje: string;
}

export const create = async (data: CrearIncidenciaDto): Promise<IIncidencia> => {
    const incidencia = new IncidenciaModel(data);
    return incidencia.save();
};

export const getAll = async (): Promise<IIncidencia[]> => {
    return IncidenciaModel.find().sort({ createdAt: -1 });
};

export const getById = async (id: string): Promise<IIncidencia | null> => {
    return IncidenciaModel.findById(id);
};