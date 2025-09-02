import { Request, Response } from "express";
import * as dishService from "../services/dishService";
import { deleteFile } from "../config/multer";

export const getAllDishes = async (_req: Request, res: Response) => {
    try {
        const dishes = await dishService.getAll();
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener platos" });
    }
};

export const getDishById = async (req: Request, res: Response) => {
    try {
        const dish = await dishService.getById(req.params.id);
        if (!dish) return res.status(404).json({ error: "Plato no encontrado" });
        res.json(dish);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el plato" });
    }
};

export const createDish = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (req.file) {
            data.imagen = `/uploads/${req.file.filename}`;
        }

        const newDish = await dishService.create(data);
        res.status(201).json(newDish);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el plato" });
    }
};

export const updateDish = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const dish = await dishService.getById(id);
        if (!dish) return res.status(404).json({ error: "Plato no encontrado" });

        if (req.file) {
            if (dish.imagen) {
                deleteFile(dish.imagen);
            }
            data.imagen = `/uploads/${req.file.filename}`;
        }

        const updated = await dishService.update(id, data);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el plato" });
    }
};

export const deleteDish = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const dish = await dishService.getById(id);
        if (!dish) return res.status(404).json({ error: "Plato no encontrado" });

        if (dish.imagen) {
            deleteFile(dish.imagen);
        }

        await dishService.remove(id);

        res.json({ message: "Plato eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el plato" });
    }
};

export const getPrincipales = async (_req: Request, res: Response) => {
    try {
        const dishes = await dishService.getPrincipales();
        res.json(dishes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getEntrantes = async (_req: Request, res: Response) => {
    try {
        const dishes = await dishService.getEntrantes();
        res.json(dishes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPostres = async (_req: Request, res: Response) => {
    try {
        const dishes = await dishService.getPostres();
        res.json(dishes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};