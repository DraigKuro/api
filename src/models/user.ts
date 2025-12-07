import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
  usuario: string;
  contraseña: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser>("User", UserSchema);