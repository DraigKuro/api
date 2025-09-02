import { Request, Response } from "express";
import * as tableService from "../services/tableService";

export const getAllTables = async (_req: Request, res: Response) => {
    try {
        const tables = await tableService.getAll();
        res.json(tables);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener las mesas" });
    }
};

export const getTableByUid = async (req: Request, res: Response) => {
    try {
        const { uid } = req.params;
        const table = await tableService.getByUid(uid);
        if (!table) {
            return res.status(404).json({ message: "Mesa no encontrada" });
        }
        res.json(table);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener la mesa" });
    }
};

export const createTable = async (req: Request, res: Response) => {
    try {
        const table = await tableService.create(req.body);
        res.status(201).json(table);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al crear la mesa" });
    }
};

export const updateTable = async (req: Request, res: Response) => {
    try {
        const updated = await tableService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Mesa no encontrada" });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al actualizar la mesa" });
    }
};

export const deleteTable = async (req: Request, res: Response) => {
    try {
        const deleted = await tableService.remove(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Mesa no encontrada" });
        res.json({ message: "Mesa eliminada correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al eliminar la mesa" });
    }
};