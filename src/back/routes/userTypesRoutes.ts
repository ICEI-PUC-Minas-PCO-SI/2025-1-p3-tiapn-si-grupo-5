import express from "express";
import { getAllUserTypes } from "../controllers/getAllUserTypes";

const router = express.Router();

router.get("/", getAllUserTypes);

export default router;
