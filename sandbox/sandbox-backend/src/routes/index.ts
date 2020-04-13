import { Router } from "express";
import ImageRouter from "./Images";
import DocumentsRouter from "./Documents";
// Init router and path
const router = Router();

// Add sub-routes
router.use("/images", ImageRouter);
router.use("/documents", DocumentsRouter);

// Export the base-router
export default router;
