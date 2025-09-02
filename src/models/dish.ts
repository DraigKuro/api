import { Schema, model, Document } from "mongoose";

export interface DishDocument extends Document {
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  activo: boolean;
  deletedAt?: Date | null;
}

const dishSchema = new Schema<DishDocument>(
  {
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    imagen: { type: String, default: "" },
    activo: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

export const Dish = model<DishDocument>("Dish", dishSchema);
