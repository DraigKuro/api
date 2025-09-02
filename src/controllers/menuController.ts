import { Request, Response } from "express";
import * as menuService from "../services/menuService";
import { deleteFile } from "../config/multer";

export const getAllMenus = async (_req: Request, res: Response) => {
    try {
        const menus = await menuService.getAll();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener menús" });
    }
};

export const getMenuById = async (req: Request, res: Response) => {
    try {
        const menu = await menuService.getById(req.params.id);
        if (!menu) return res.status(404).json({ error: "Menú no encontrado" });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el menú" });
    }
};

export const createMenu = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "La imagen es obligatoria" });
        }
        data.imagen = `/uploads/${req.file.filename}`;

        const newMenu = await menuService.create(data, req.file);
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el menú" });
    }
};

export const updateMenu = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const menu = await menuService.getById(id);
        if (!menu) return res.status(404).json({ error: "Menú no encontrado" });

        if (req.file) {
            if (menu.imagen) deleteFile(menu.imagen);
            data.imagen = `/uploads/${req.file.filename}`;
        }

        const updated = await menuService.update(id, data, req.file);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el menú" });
    }
};

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const menu = await menuService.getById(id);
        if (!menu) return res.status(404).json({ error: "Menú no encontrado" });

        await menuService.remove(id);
        res.json({ message: "Menú eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el menú" });
    }
};
