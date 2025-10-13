import { Request, Response } from "express";
import * as incidenciaService from "../services/incidenciaService";
import { asyncHandler } from "../utils/asyncHandler";
import { ControllerError } from "../utils/errors";

export const getAllIncidencias = asyncHandler(async (_req: Request, res: Response) => {
    const incidencias = await incidenciaService.getAll();
    res.json(incidencias);
});

export const getIncidenciaById = asyncHandler(async (req: Request, res: Response) => {
    const incidencia = await incidenciaService.getById(req.params.id);
    if (!incidencia) throw ControllerError(404, "Incidencia no encontrada");
    res.json(incidencia);
});

export const createIncidencia = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
        throw ControllerError(400, "Faltan campos obligatorios");
    }

    const nuevaIncidencia = await incidenciaService.create(data);
    res.status(201).json(nuevaIncidencia);
});
