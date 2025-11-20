import { Request, Response } from "express";
import * as drinkService from "../services/drinkService";
import { deleteFile } from "../config/multer";
import { asyncHandler } from "../utils/asyncHandler";
import { ControllerError } from "../utils/errors";

export const getAllDrinks = asyncHandler(async (_req: Request, res: Response) => {
    const drinks = await drinkService.getAll();
    res.json(drinks);
});

export const getDrinkById = asyncHandler(async (req: Request, res: Response) => {
    const drink = await drinkService.getById(req.params.id);
    if (!drink) throw ControllerError(404, "Bebida no encontrada");
    res.json(drink);
});

export const createDrink = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const newDrink = await drinkService.create(data, req.file);
    res.status(201).json(newDrink);
});

export const updateDrink = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const drink = await drinkService.getById(id);
    if (!drink) throw ControllerError(404, "Bebida no encontrada");

    if (req.file && drink.imagen) {
        deleteFile(drink.imagen);
    }

    const updated = await drinkService.update(id, data, req.file);
    res.json(updated);
});

export const deleteDrink = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    const drink = await drinkService.getById(id);
    if (!drink) throw ControllerError(404, "Bebida no encontrada");

    if (drink.imagen) {
        deleteFile(drink.imagen);
    }

    await drinkService.remove(id);

    res.json({ message: "Bebida eliminada correctamente" });
});
