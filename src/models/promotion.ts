import { Schema, model, Document, Types } from "mongoose";
import { DishDocument } from "./dish";
import { DrinkDocument } from "./drink";

export interface PromotionDocument extends Document {
    nombre: string;
    descripcion: string;
    entrante?: Types.ObjectId | DishDocument;
    principal?: Types.ObjectId | DishDocument;
    bebida?: Types.ObjectId | DrinkDocument;
    postre?: Types.ObjectId | DishDocument;
    precio: number;
    cantidad: number;
    activo: boolean;
    imagen: string;
    deletedAt?: Date;
}

const promotionSchema = new Schema<PromotionDocument>(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        entrante: { type: Schema.Types.ObjectId, ref: "Dish" },
        principal: { type: Schema.Types.ObjectId, ref: "Dish" },
        bebida: { type: Schema.Types.ObjectId, ref: "Drink" },
        postre: { type: Schema.Types.ObjectId, ref: "Dish" },
        precio: { type: Number, required: true },
        cantidad: { type: Number, required: true, min: 1 },
        activo: { type: Boolean, default: true },
        imagen: { type: String, required: true },
        deletedAt: { type: Date, default: null }
    },
    { timestamps: true, versionKey: false }
);

export const Promotion = model<PromotionDocument>("Promotion", promotionSchema);
