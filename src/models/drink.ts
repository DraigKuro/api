import { Schema, model, Document } from "mongoose";

export interface DrinkDocument extends Document {
  nombre: string;
  tipo: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  activo: boolean;
  deletedAt?: Date | null;
}

const drinkSchema = new Schema<DrinkDocument>(
  {
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    imagen: { type: String, default: "" },
    activo: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

export const Drink = model<DrinkDocument>("Drink", drinkSchema);
