import express from "express";
import { addCourseToCart, removeCourseFromCart,
 } from "../app/controller/cart.controller.js";
const router = express.Router();

router.post("/add/:user_id/:course_id/:choice_type", addCourseToCart);
router.post("/remove/:user_id/:course_id/:choice_type", removeCourseFromCart);

export default router;
