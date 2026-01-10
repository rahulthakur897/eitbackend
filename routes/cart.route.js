import express from "express";
import { addCourseToCart, removeCourseToCart
 } from "../app/controller/cart.controller.js";
const router = express.Router();

router.post("/add", addCourseToCart);
router.delete("/delete/:user_id/:course_id/:choice_type", removeCourseToCart);
export default router;
