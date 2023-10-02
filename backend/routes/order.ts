import { Router } from "express";

import { get } from "../controllers/order";

const router = Router();

router.get("/:id", get);

export default router;
