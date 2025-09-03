import { Router } from "express";
import { createIncidencia, getAllIncidencias, getIncidenciaById } from "../controllers/incidenciaController";

const router = Router();

router.get("/", getAllIncidencias);
router.get("/:id", getIncidenciaById);

router.post("/", createIncidencia);
export default router;
