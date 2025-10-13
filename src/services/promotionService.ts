import { Promotion } from "../models/promotion";
import { ServiceError } from "../utils/errors";

export const getAll = async () => {
    try {
        return await Promotion.find({ deletedAt: null })
            .populate("entrante")
            .populate("principal")
            .populate("bebida")
            .populate("postre");
    } catch {
        throw ServiceError("Error al obtener las promociones");
    }
};

export const getById = async (id: string) => {
    try {
        return await Promotion.findOne({ _id: id, deletedAt: null })
            .populate("entrante")
            .populate("principal")
            .populate("bebida")
            .populate("postre");
    } catch {
        throw ServiceError("Error al obtener la promoción por ID");
    }
};

export const create = async (data: any, file?: Express.Multer.File) => {
    try {
        const preparedData = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            entrante: data.entrante || undefined,
            principal: data.principal || undefined,
            bebida: data.bebida || undefined,
            postre: data.postre || undefined,
            precio: Number(data.precio),
            cantidad: Number(data.cantidad),
            activo: data.activo === "true" || data.activo === true,
            imagen: file ? `/uploads/${file.filename}` : "",
        };

        const promo = new Promotion(preparedData);
        return await promo.save();
    } catch {
        throw ServiceError("Error al crear la promoción");
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
            cantidad: data.cantidad !== undefined ? Number(data.cantidad) : undefined,
            activo: data.activo !== undefined ? data.activo === "true" || data.activo === true : undefined,
        };

        if (file) {
            updatedData.imagen = `/uploads/${file.filename}`;
        }

        return await Promotion.findByIdAndUpdate(id, updatedData, { new: true });
    } catch {
        throw ServiceError("Error al actualizar la promoción");
    }
};

export const remove = async (id: string) => {
    try {
        return await Promotion.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    } catch {
        throw ServiceError("Error al eliminar la promoción");
    }
};
