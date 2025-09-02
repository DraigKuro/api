import { Table, TableDocument } from "../models/table";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";

export const getAll = async (): Promise<TableDocument[]> => {
    return await Table.find({ deletedAt: null });
};

export const getByUid = async (uid: string): Promise<Pick<TableDocument, "nombre"> | null> => {
    const table = await Table.findOne({ uid, deletedAt: null }).select("nombre");
    return table;
};

export const create = async (data: Partial<TableDocument>): Promise<TableDocument> => {
    const uid = uuidv4();

    const qrUrl = `${process.env.FRONTEND_URL}/mesa/${uid}`;

    const table = new Table({
        ...data,
        uid,
        qrUrl,
        estado: data.estado ?? false,
    });

    return await table.save();
};

export const update = async (id: string, data: Partial<TableDocument>): Promise<TableDocument | null> => {
    const { uid, qrUrl, ...updateData } = data;

    const updatedTable = await Table.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );

    return updatedTable;
};

export const remove = async (id: string): Promise<TableDocument | null> => {
    if (!Types.ObjectId.isValid(id)) return null;
    return await Table.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};
