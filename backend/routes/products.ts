import { Router } from "express";

import { create, getAll, getById, search } from "../controllers/products";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/search/:key", search);
router.post("/", create);

export default router;
