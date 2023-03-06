import express from "express";
import {
  getUser,
  getUsers,
  getAllUsers,
  getUsersArchived,
  archivedUser,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getUsers);
router.get("/", verifyToken, getAllUsers);
router.get("/archives", verifyToken, getUsersArchived);
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/:id", verifyToken, updateUser);

/* ARCHIVE */
router.patch("/archive/:id", verifyToken, archivedUser);

export default router;
