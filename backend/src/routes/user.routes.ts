import {Router} from "express";
import {requireAuth} from "../middleware/auth.middleware";
import {userController} from "../controllers/user.controller";

const router = Router();

router.get("/", requireAuth(), userController.getUsers);
router.patch("/status", requireAuth(), userController.updateUsersStatus);
router.delete("/", requireAuth(), userController.deleteUsers);

export default router;
