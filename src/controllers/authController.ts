import { Request, Response } from "express";
import { AuthRequest } from "../utils/authType";
import { register, login, getUserById, verifyToken } from "../services/authService";

export const registerController = async (req: Request, res: Response) => {
    try {
        const { usuario, contraseña } = req.body;
        if (!usuario || !contraseña) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const user = await register(usuario, contraseña);
        res.status(201).json({ message: "Usuario creado", user, });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const { usuario, contraseña } = req.body;
        if (!usuario || !contraseña) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const { token, user } = await login(usuario, contraseña);

        res.json({
            message: "Login exitoso",
            token,
            user,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const meController = async (req: AuthRequest, res: Response) => {
    if (!req.user?.id) {
        return res.status(401).json({ message: "No autorizado" });
    }

    const user = await getUserById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ user });
};