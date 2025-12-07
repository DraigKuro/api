import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

const JWT_SECRET: string = process.env.JWT_SECRET!;

interface JwtPayload {
    id: string;
    usuario: string;
}

export const register = async (usuario: string, contraseña: string) => {
    const usuarioNormalizado = usuario.toLowerCase().trim();

    const existe = await User.findOne({ usuario: usuarioNormalizado });
    if (existe) throw new Error("El usuario ya existe");

    const hash = await bcrypt.hash(contraseña, 10);

    const newUser = await User.create({
        usuario: usuarioNormalizado,
        contraseña: hash,
    });

    const user = newUser.toObject();

    return {
        id: user._id.toString(),
        usuario: user.usuario,
    };
};

export const login = async (usuario: string, contraseña: string) => {
    const usuarioNormalizado = usuario.toLowerCase().trim();
    const user = await User.findOne({ usuario: usuarioNormalizado }).lean();
    if (!user) throw new Error("Usuario o contraseña incorrectos");

    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) throw new Error("Usuario o contraseña incorrectos");

    const payload: JwtPayload = {
        id: user._id.toString(),
        usuario: user.usuario,
    };

    const token = jwt.sign(
        payload, 
        JWT_SECRET, 
        {expiresIn: "7d",}
    );

    return {
        token,
        user: {
            id: user._id.toString(),
            usuario: user.usuario,
        },
    };
};

export const getUserById = async (id: string) => {
    const user = await User.findById(id).select("-contraseña").lean();
    if (!user) return null;

    return {
        id: user._id.toString(),
        usuario: user.usuario,
    };
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return payload;
    } catch (error) {
        return null;
    }
};
