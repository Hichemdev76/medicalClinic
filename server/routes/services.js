// import { getService, addService } from "../controllers/services.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getService, addService, getAllServices } from "../controllers/services.js";

const router = express.Router();

router.get("/:name",verifyToken,getService)
router.get("/", verifyToken, getAllServices);
router.post("/", verifyToken, addService);

export default router;
