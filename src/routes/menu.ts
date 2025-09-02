import { Router } from "express";
import * as menuController from "../controllers/menuController";
import { upload } from "../config/multer";

const router = Router();

router.get("/", menuController.getAllMenus);
router.get("/:id", menuController.getMenuById);
router.post("/", upload.single("image"), menuController.createMenu);
router.put("/:id", upload.single("image"), menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

export default router;