import { Router } from "express";

import { add, get, remove, decrement } from "../controllers/cart";

const router = Router();

router.get("/find/:id", get);
router.post("/", add);
router.post("/quantity", decrement);
router.delete("/:cartItemId", remove);

export default router;
