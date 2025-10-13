import { Request, Response } from "express";
import * as dishService from "../services/dishService";
import { deleteFile } from "../config/multer";
import { asyncHandler } from "../utils/asyncHandler";
import { ControllerError } from "../utils/errors";

export const getAllDishes = asyncHandler(async (_req: Request, res: Response) => {
    const dishes = await dishService.getAll();
    res.json(dishes);
});

export const getDishById = asyncHandler(async (req: Request, res: Response) => {
    const dish = await dishService.getById(req.params.id);
    if (!dish) throw ControllerError(404, "Plato no encontrado");
    res.json(dish);
});

export const createDish = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    if (req.file) {
        data.imagen = `/uploads/${req.file.filename}`;
    }

    const newDish = await dishService.create(data);
    res.status(201).json(newDish);
});

export const updateDish = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const dish = await dishService.getById(id);
    if (!dish) throw ControllerError(404, "Plato no encontrado");

    if (req.file) {
        if (dish.imagen) {
            deleteFile(dish.imagen);
        }
        data.imagen = `/uploads/${req.file.filename}`;
    }

    const updated = await dishService.update(id, data);
    res.json(updated);
});

export const deleteDish = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    const dish = await dishService.getById(id);
    if (!dish) throw ControllerError(404, "Plato no encontrado");

    if (dish.imagen) {
        deleteFile(dish.imagen);
    }

    await dishService.remove(id);

    res.json({ message: "Plato eliminado correctamente" });
});

export const getPrincipales = asyncHandler(async (_req: Request, res: Response) => {
    const dishes = await dishService.getPrincipales();
    res.json(dishes);
});

export const getEntrantes = asyncHandler(async (_req: Request, res: Response) => {
    const dishes = await dishService.getEntrantes();
    res.json(dishes);
});

export const getPostres = asyncHandler(async (_req: Request, res: Response) => {
    const dishes = await dishService.getPostres();
    res.json(dishes);
});
