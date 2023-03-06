import express from "express";

import {
  addLeave,
  leaveUpdate,
  getLeave,
  getLeaveList,
} from "../controllers/leave.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getLeaveList);
router.get("/:id", verifyToken, getLeave);

/*CREATE*/
router.post("/", verifyToken, addLeave);

/* UPDATE */
router.patch("/:id", verifyToken, leaveUpdate);

export default router;
