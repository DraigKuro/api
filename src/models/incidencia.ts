import { Schema, model, Document } from "mongoose";

export interface IIncidencia extends Document {
  nombre: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
  createdAt: Date;
}

const IncidenciaSchema = new Schema<IIncidencia>({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String },
  asunto: { type: String, required: true },
  mensaje: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const IncidenciaModel = model<IIncidencia>("Incidencia", IncidenciaSchema);
