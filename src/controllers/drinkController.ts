import { Request, Response } from "express";
import * as drinkService from "../services/drinkService";
import { deleteFile } from "../config/multer";

export const getAllDrinks = async (_req: Request, res: Response) => {
    try {
        const drinks = await drinkService.getAll();
        res.json(drinks);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener bebidas" });
    }
};

export const getDrinkById = async (req: Request, res: Response) => {
    try {
        const drink = await drinkService.getById(req.params.id);
        if (!drink) return res.status(404).json({ error: "Bebida no encontrada" });
        res.json(drink);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la bebida" });
    }
};

export const createDrink = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (req.file) {
            data.imagen = `/uploads/${req.file.filename}`;
        }

        const newDrink = await drinkService.create(data, req.file);
        res.status(201).json(newDrink);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la bebida" });
    }
};

export const updateDrink = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const drink = await drinkService.getById(id);
        if (!drink) return res.status(404).json({ error: "Bebida no encontrada" });

        if (req.file) {
            if (drink.imagen) {
                deleteFile(drink.imagen);
            }
            data.imagen = `/uploads/${req.file.filename}`;
        }

        const updated = await drinkService.update(id, data, req.file);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la bebida" });
    }
};

export const deleteDrink = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const drink = await drinkService.getById(id);
        if (!drink) return res.status(404).json({ error: "Bebida no encontrada" });

        if (drink.imagen) {
            deleteFile(drink.imagen);
        }

        await drinkService.remove(id);

        res.json({ message: "Bebida eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la bebida" });
    }
};
