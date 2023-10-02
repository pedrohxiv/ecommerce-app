import { Router } from "express";

import { remove, getById } from "../controllers/user";

const router = Router();

router.delete("/:id", remove);
router.get("/:id", getById);

export default router;
