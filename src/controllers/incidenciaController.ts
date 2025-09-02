import { Request, Response } from "express";
import * as incidenciaService from "../services/incidenciaService";

export const getAllIncidencias = async (_req: Request, res: Response) => {
    try {
        const incidencias = await incidenciaService.getAll();
        res.json(incidencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las incidencias" });
    }
};

export const getIncidenciaById = async (req: Request, res: Response) => {
    try {
        const incidencia = await incidenciaService.getById(req.params.id);
        if (!incidencia) return res.status(404).json({ error: "Incidencia no encontrada" });
        res.json(incidencia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener la incidencia" });
    }
};

export const createIncidencia = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const nuevaIncidencia = await incidenciaService.create(data);
        res.status(201).json(nuevaIncidencia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la incidencia" });
    }
};
