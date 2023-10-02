import { Router } from "express";

import { create, login } from "../controllers/auth";

const router = Router();

router.post("/register", create);
router.get("/login", login);

export default router;
