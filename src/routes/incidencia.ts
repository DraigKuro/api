import { Router } from "express";
import { createIncidencia, getAllIncidencias, getIncidenciaById } from "../controllers/incidenciaController";

const router = Router();

router.post("/", createIncidencia);
router.get("/", getAllIncidencias);
router.get("/:id", getIncidenciaById);

export default router;
