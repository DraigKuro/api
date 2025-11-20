import { Request, Response } from "express";
import * as promotionService from "../services/promotionService";
import { deleteFile } from "../config/multer";
import { asyncHandler } from "../utils/asyncHandler";
import { ControllerError } from "../utils/errors";

export const getAllPromotions = asyncHandler(async (_req: Request, res: Response) => {
    const promotions = await promotionService.getAll();
    res.json(promotions);
});

export const getPromotionById = asyncHandler(async (req: Request, res: Response) => {
    const promotion = await promotionService.getById(req.params.id);
    if (!promotion) throw ControllerError(404, "Promoción no encontrada");
    res.json(promotion);
});

export const createPromotion = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    if (!req.file) {
        throw ControllerError(400, "La imagen es obligatoria");
    }
    const newPromotion = await promotionService.create(data, req.file);

    res.status(201).json(newPromotion);
});

export const updatePromotion = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const promotion = await promotionService.getById(id);
    if (!promotion) throw ControllerError(404, "Promoción no encontrada");

    if (req.file) {
        if (promotion.imagen) {
            deleteFile(promotion.imagen);
        }
    }

    const updated = await promotionService.update(id, data, req.file);
    res.json(updated);
});

export const deletePromotion = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    const promotion = await promotionService.getById(id);
    if (!promotion) throw ControllerError(404, "Promoción no encontrada");

    if (promotion.imagen) {
        deleteFile(promotion.imagen);
    }

    await promotionService.remove(id);
    res.json({ message: "Promoción eliminada correctamente" });
});
