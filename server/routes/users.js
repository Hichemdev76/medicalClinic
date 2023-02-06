import express from "express";
import {
  getUser,
    getUsers,
  //   updateUser,
  //   archivedUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/all", getUsers);
router.get("/:id", getUser);

/* UPDATE */
// router.patch("/:id", verifyToken, updateUser);

/* ARCHIVE */
// router.patch("/:id/:userId", verifyToken, archivedUser);

export default router;
