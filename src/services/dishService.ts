import { Dish } from "../models/dish";
import { ServiceError } from "../utils/errors";

export const getAll = async () => {
    try {
        return await Dish.find({ deletedAt: null });
    } catch {
        throw ServiceError("Error al obtener los platos");
    }
};

export const getById = async (id: string) => {
    try {
        return await Dish.findById(id);
    } catch {
        throw ServiceError("Error al obtener el plato por ID");
    }
};

export const create = async (data: any, file?: Express.Multer.File) => {
    try {
        const preparedData = {
            nombre: data.name,
            categoria: data.categoria,
            descripcion: data.description,
            precio: Number(data.price),
            activo: data.activo === "true" || data.activo === true,
            imagen: file ? `/uploads/${file.filename}` : null,
        };

        const dish = new Dish(preparedData);
        return await dish.save();
    } catch {
        throw ServiceError("Error al crear el plato");
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
            updatedData.imagen = `/uploads/${file.filename}`;
        }

        return await Dish.findByIdAndUpdate(id, updatedData, { new: true });
    } catch {
        throw ServiceError("Error al actualizar el plato");
    }
};

export const remove = async (id: string) => {
    try {
        return await Dish.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    } catch {
        throw ServiceError("Error al eliminar el plato");
    }
};

export const getPrincipales = async () => {
    try {
        return await Dish.find({ categoria: "Principal", deletedAt: null });
    } catch {
        throw ServiceError("Error al obtener los platos principales");
    }
};

export const getEntrantes = async () => {
    try {
        return await Dish.find({ categoria: "Entrante", deletedAt: null });
    } catch {
        throw ServiceError("Error al obtener los entrantes");
    }
};

export const getPostres = async () => {
    try {
        return await Dish.find({ categoria: "Postre", deletedAt: null });
    } catch {
        throw ServiceError("Error al obtener los postres");
    }
};
