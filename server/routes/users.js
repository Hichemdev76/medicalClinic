import express from "express";
import {
  getUser,
  getUsers,
  getUsersArchived,
  promoteUser,
  archivedUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getUsers);
router.get("/archives", verifyToken, getUsersArchived);
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/promote/:id", verifyToken, promoteUser);

/* ARCHIVE */
router.patch("/archive/:id", verifyToken, archivedUser);

export default router;
