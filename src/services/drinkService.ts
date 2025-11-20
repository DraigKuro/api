import { Drink } from "../models/drink";
import { ServiceError } from "../utils/errors";
import { STORAGE_TYPE } from "../config/multer";

export const getAll = async () => {
    try {
        return await Drink.find({ deletedAt: null });
    } catch {
        throw ServiceError("Error al obtener las bebidas");
    }
};

export const getById = async (id: string) => {
    try {
        return await Drink.findById(id);
    } catch {
        throw ServiceError("Error al obtener la bebida por ID");
    }
};

export const create = async (data: any, file?: Express.Multer.File) => {
    try {
        const preparedData = {
            nombre: data.name,
            tipo: data.categoria,
            descripcion: data.description,
            precio: Number(data.price),
            activo: data.activo === "true" || data.activo === true,
            imagen: file ? (
                STORAGE_TYPE === 'local'
                    ? `/uploads/${file.filename}`
                    : (file as any).location
            ) : null,
        };

        const drink = new Drink(preparedData);
        return await drink.save();
    } catch {
        throw ServiceError("Error al crear la bebida");
    }
};

export const update = async (id: string, data: any, file?: Express.Multer.File) => {
    try {
        const updatedData: any = {
            ...data,
            precio: data.precio !== undefined ? Number(data.precio) : undefined,
            activo: data.activo !== undefined
                ? data.activo === "true" || data.activo === true
                : undefined,
        };

        if (file) {
            updatedData.imagen = STORAGE_TYPE === 'local'
                ? `/uploads/${file.filename}`
                : (file as any).location;
        }

        return await Drink.findByIdAndUpdate(id, updatedData, { new: true });
    } catch {
        throw ServiceError("Error al actualizar la bebida");
    }
};

export const remove = async (id: string) => {
    try {
        return await Drink.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    } catch {
        throw ServiceError("Error al eliminar la bebida");
    }
};
