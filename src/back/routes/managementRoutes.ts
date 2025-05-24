import express from "express";
import { getAllActiveManagement } from "../controllers/getAllActiveManagement";

const router = express.Router();

router.get("/active", getAllActiveManagement);

export default router;
