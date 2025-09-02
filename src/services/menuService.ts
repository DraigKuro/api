import { Menu } from "../models/menu";

export const getAll = async () => {
    return await Menu.find({ deletedAt: null })
        .populate("entrante")
        .populate("principal")
        .populate("bebida")
        .populate("postre");
};

export const getById = async (id: string) => {
    return await Menu.findOne({ _id: id, deletedAt: null })
        .populate("entrante")
        .populate("principal")
        .populate("bebida")
        .populate("postre");
};

export const create = async (data: any, file?: Express.Multer.File) => {
    const preparedData = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        entrante: data.entrante,
        principal: data.principal,
        bebida: data.bebida,
        postre: data.postre || null,
        precio: Number(data.precio),
        activo: data.activo === "true" || data.activo === true,
        imagen: file ? `/uploads/${file.filename}` : undefined,
    };

    const menu = new Menu(preparedData);
    return await menu.save();
};

export const update = async (id: string, data: any, file?: Express.Multer.File) => {
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
        updatedData.imagen = `/uploads/${file.filename}`;
    }

    return await Menu.findByIdAndUpdate(id, updatedData, { new: true });
};

export const remove = async (id: string) => {
    return await Menu.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};
