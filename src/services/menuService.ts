import { Menu } from "../models/menu";
import { ServiceError } from "../utils/errors";
import { STORAGE_TYPE } from "../config/multer";

export const getAll = async () => {
    try {
        return await Menu.find({ deletedAt: null })
            .populate("entrante")
            .populate("principal")
            .populate("bebida")
            .populate("postre");
    } catch {
        throw ServiceError("Error al obtener los menús");
    }
};

export const getById = async (id: string) => {
    try {
        return await Menu.findOne({ _id: id, deletedAt: null })
            .populate("entrante")
            .populate("principal")
            .populate("bebida")
            .populate("postre");
    } catch {
        throw ServiceError("Error al obtener el menú por ID");
    }
};

export const create = async (data: any, file?: Express.Multer.File) => {
    try {
        const preparedData = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            entrante: data.entrante,
            principal: data.principal,
            bebida: data.bebida,
            postre: data.postre || null,
            precio: Number(data.precio),
            activo: data.activo === "true" || data.activo === true,
            imagen: file ? (
                STORAGE_TYPE === 'local'
                    ? `/uploads/${file.filename}`
                    : (file as any).location
            ) : undefined,
        };

        const menu = new Menu(preparedData);
        return await menu.save();
    } catch {
        throw ServiceError("Error al crear el menú");
    }
};

export const update = async (id: string, data: any, file?: Express.Multer.File) => {
    try {
        const updatedData: any = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            entrante: data.entrante,
            principal: data.principal,
            bebida: data.bebida,
            postre: data.postre || null,
            precio: data.precio !== undefined ? Number(data.precio) : undefined,
            activo: data.activo !== undefined ? data.activo === "true" || data.activo === true : undefined,
        };

            if (file) {
                updatedData.imagen = STORAGE_TYPE === 'local'
                    ? `/uploads/${file.filename}`
                    : (file as any).location;
            }

        return await Menu.findByIdAndUpdate(id, updatedData, { new: true });
    } catch {
        throw ServiceError("Error al actualizar el menú");
    }
};

export const remove = async (id: string) => {
    try {
        return await Menu.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    } catch {
        throw ServiceError("Error al eliminar el menú");
    }
};
