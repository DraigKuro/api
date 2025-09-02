import { Schema, model, Document } from "mongoose";

export interface TableDocument extends Document {
    nombre: string;
    uid: string;
    estado: boolean;
    activo: boolean;
    qrUrl: string;
    deletedAt?: Date;
}

const tableSchema = new Schema<TableDocument>(
    {
        nombre: { type: String, required: true },
        uid: { type: String, required: true},
        estado: { type: Boolean, default: false },
        activo: { type: Boolean, default: true },
        qrUrl: { type: String, required: true },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true, versionKey: false }
);

export const Table = model<TableDocument>("Table", tableSchema);
