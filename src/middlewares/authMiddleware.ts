import { NextFunction, Response } from "express";
import { AuthRequest, JwtPayload } from "../utils/authType";
import { verifyToken } from "../services/authService";

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyToken(token);

    if (!payload) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }

    req.user = payload as JwtPayload;
    next();
};