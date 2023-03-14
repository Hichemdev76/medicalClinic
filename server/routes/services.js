import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getService,
  addService,
  getAllServices,
  updateService,
} from "../controllers/services.js";

const router = express.Router();

router.get("/:name", verifyToken, getService);
router.get("/", verifyToken, getAllServices);
router.post("/", verifyToken, addService);
router.patch("/update", verifyToken, updateService);

export default router;
