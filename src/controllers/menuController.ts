import { Request, Response } from "express";
import * as menuService from "../services/menuService";
import { deleteFile } from "../config/multer";
import { asyncHandler } from "../utils/asyncHandler";
import { ControllerError } from "../utils/errors";

export const getAllMenus = asyncHandler(async (_req: Request, res: Response) => {
    const menus = await menuService.getAll();
    res.json(menus);
});

export const getMenuById = asyncHandler(async (req: Request, res: Response) => {
    const menu = await menuService.getById(req.params.id);
    if (!menu) throw ControllerError(404, "Menú no encontrado");
    res.json(menu);
});

export const createMenu = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    if (!req.file) {
        throw ControllerError(400, "La imagen es obligatoria");
    }

    data.imagen = `/uploads/${req.file.filename}`;
    const newMenu = await menuService.create(data, req.file);

    res.status(201).json(newMenu);
});

export const updateMenu = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const menu = await menuService.getById(id);
    if (!menu) throw ControllerError(404, "Menú no encontrado");

    if (req.file) {
        if (menu.imagen) {
            deleteFile(menu.imagen);
        }
        data.imagen = `/uploads/${req.file.filename}`;
    }

    const updated = await menuService.update(id, data, req.file);
    res.json(updated);
});

export const deleteMenu = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    const menu = await menuService.getById(id);
    if (!menu) throw ControllerError(404, "Menú no encontrado");

    if (menu.imagen) {
        deleteFile(menu.imagen);
    }

    await menuService.remove(id);
    res.json({ message: "Menú eliminado correctamente" });
});
