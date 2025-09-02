import { Router } from "express";
import * as dishController from "../controllers/dishController";
import { upload } from "../config/multer"; 

const router = Router();

router.get("/", dishController.getAllDishes);

router.get("/principales", dishController.getPrincipales);
router.get("/entrantes", dishController.getEntrantes);
router.get("/postres", dishController.getPostres);

router.get("/:id", dishController.getDishById);

router.post("/", upload.single("image"), dishController.createDish);
router.put("/:id", upload.single("image"), dishController.updateDish);
router.delete("/:id", dishController.deleteDish);

export default router;
