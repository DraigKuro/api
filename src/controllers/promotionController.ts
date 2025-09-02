import { Request, Response } from "express";
import * as promotionService from "../services/promotionService";
import { deleteFile } from "../config/multer";

export const getAllPromotions = async (_req: Request, res: Response) => {
    try {
        const promotions = await promotionService.getAll();
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener promociones" });
    }
};

export const getPromotionById = async (req: Request, res: Response) => {
    try {
        const promotion = await promotionService.getById(req.params.id);
        if (!promotion) return res.status(404).json({ error: "Promoción no encontrada" });
        res.json(promotion);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la promoción" });
    }
};

export const createPromotion = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "La imagen es obligatoria" });
        }
        data.imagen = `/uploads/${req.file.filename}`;

        const newPromotion = await promotionService.create(data, req.file);
        res.status(201).json(newPromotion);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la promoción" });
    }
};

export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const promotion = await promotionService.getById(id);
        if (!promotion) return res.status(404).json({ error: "Promoción no encontrada" });

        if (req.file) {
            if (promotion.imagen) deleteFile(promotion.imagen);
            data.imagen = `/uploads/${req.file.filename}`;
        }

        const updated = await promotionService.update(id, data, req.file);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la promoción" });
    }
};

export const deletePromotion = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const promotion = await promotionService.getById(id);
        if (!promotion) return res.status(404).json({ error: "Promoción no encontrada" });

        await promotionService.remove(id);
        res.json({ message: "Promoción eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la promoción" });
    }
};
