import { Drink } from "../models/drink";

export const getAll = async () => {
    return await Drink.find({ deletedAt: null });
};

export const getById = async (id: string) => {
    return await Drink.findById(id);
};

export const create = async (data: any, file?: Express.Multer.File) => {
    const preparedData = {
        nombre: data.name,
        tipo: data.categoria,
        descripcion: data.description,
        precio: Number(data.price),
        activo: data.activo === "true" || data.activo === true,
        imagen: file ? `/uploads/${file.filename}` : null,
    };

    const drink = new Drink(preparedData);
    return await drink.save();
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

    return await Drink.findByIdAndUpdate(id, updatedData, { new: true });
};

export const remove = async (id: string) => {
   return await Drink.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};
