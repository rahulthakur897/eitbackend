import express from "express";
import { getCategories, addCategory, updateCategory, deleteCategory, getCategoryCourses } from "../app/controller/category.controller.js";
const router = express.Router();

router.get("/all", getCategories);
router.post("/add", addCategory);
router.post("/update", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.post("/selected-courses", getCategoryCourses);

export default router;
