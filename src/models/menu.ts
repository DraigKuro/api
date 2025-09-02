import { Schema, model, Document, Types } from "mongoose";
import { DishDocument } from "./dish";
import { DrinkDocument } from "./drink";

export interface MenuDocument extends Document {
    nombre: string;
    descripcion: string;
    entrante: Types.ObjectId | DishDocument;
    principal: Types.ObjectId | DishDocument;
    bebida: Types.ObjectId | DrinkDocument;
    postre?: Types.ObjectId | DishDocument;
    precio: number;
    activo: boolean;
    imagen: string;
    deletedAt?: Date;
}

const menuSchema = new Schema<MenuDocument>(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        entrante: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
        principal: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
        bebida: { type: Schema.Types.ObjectId, ref: "Drink", required: true },
        postre: { type: Schema.Types.ObjectId, ref: "Dish" },
        precio: { type: Number, required: true },
        activo: { type: Boolean, default: true },
        imagen: { type: String, required: true },
        deletedAt: { type: Date, default: null }
    },
    { timestamps: true, versionKey: false }
);

export const Menu = model<MenuDocument>("Menu", menuSchema);
