import express from "express";
import { getPopularCourses, getAllCourses, getCourseMenu, getCourseDetail } from "../app/controller/courses.controller.js";
const router = express.Router();

router.get("/popular", getPopularCourses);
router.get('/all', getAllCourses)
router.get("/menu", getCourseMenu);
router.get("/detail/:id", getCourseDetail);

export default router;
