import express from "express";
import { getCategories } from "../app/controller/category.controller.js";
const router = express.Router();

router.get("/all", getCategories);

export default router;
