import express from "express";
import { getPopularCourses, getAllCourses, getCourseMenu, getCourseDetail, addCourse, deleteCourse } from "../app/controller/courses.controller.js";
const router = express.Router();

router.get("/popular", getPopularCourses);
router.get('/all', getAllCourses)
router.get("/menu", getCourseMenu);
router.get("/detail/:id", getCourseDetail);
router.post("/add", addCourse);
router.delete("/add/:id", deleteCourse);
export default router;
