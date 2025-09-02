import { Dish } from "../models/dish";

export const getAll = async () => {
    return await Dish.find({ deletedAt: null });
};

export const getById = async (id: string) => {
    return await Dish.findById(id);
};

export const create = async (data: any, file?: Express.Multer.File) => {
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
};

export const update = async (id: string, data: any, file?: Express.Multer.File) => {
    const updatedData: any = {
        ...data,
        precio: data.precio !== undefined ? Number(data.precio) : undefined,
        activo: data.activo !== undefined ? data.activo === "true" || data.activo === true : undefined,
    };

    if (file) {
        updatedData.imagen = `/uploads/${file.filename}`;
    }

    return await Dish.findByIdAndUpdate(id, updatedData, { new: true });
};

export const remove = async (id: string) => {
    return await Dish.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};

export const getPrincipales = async () => {
    return await Dish.find({ categoria: "Principal", deletedAt: null });
};

export const getEntrantes = async () => {
    return await Dish.find({ categoria: "Entrante", deletedAt: null });
};

export const getPostres = async () => {
    return await Dish.find({ categoria: "Postre", deletedAt: null });
};
