import { Router } from "express";
import userRouter from "./users.mjs";
import productsRouter from "./products.mjs";
import authRouter from "./auth.mjs";

const router = Router();

router.use(userRouter);
router.use(productsRouter);
router.use(authRouter);

export default router;
