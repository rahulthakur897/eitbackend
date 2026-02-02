import express from "express";
import {
  getPopularCourses,
  getAllCourses,
  getCourseMenu,
  getCourseDetail,
  addCourse,
  deleteCourse,
  updateCourse,
  getUpcomingCourses,
  addUpcomingCourses,
  updateUpcomingCourses,
  deleteUpComingCourse,
  addPopularCourses,
  updatePopularCourses,
  deletePopularCourses
} from "../app/controller/courses.controller.js";
const router = express.Router();

router.get("/popular", getPopularCourses);
router.get("/all", getAllCourses);
router.get("/menu", getCourseMenu);
router.get("/detail/:id", getCourseDetail);
router.post("/add", addCourse);
router.delete("/delete/:id", deleteCourse);
router.post("/update", updateCourse);
router.get("/upcoming", getUpcomingCourses);
router.post("/upcoming/add", addUpcomingCourses);
router.post("/upcoming/update", updateUpcomingCourses);
router.delete("/upcoming/delete/:id", deleteUpComingCourse);
router.get("/popular", getPopularCourses);
router.post("/popular/add", addPopularCourses);
router.post("/popular/update", updatePopularCourses);
router.delete("/popular/delete/:id", deletePopularCourses);
export default router;
