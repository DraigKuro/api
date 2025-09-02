import { Router } from "express";
import * as tableController from "../controllers/tableController";

const router = Router();

router.get("/", tableController.getAllTables);
router.get("/uid/:uid", tableController.getTableByUid);
router.post("/", tableController.createTable);
router.put("/:id", tableController.updateTable);
router.delete("/:id", tableController.deleteTable);

export default router;
