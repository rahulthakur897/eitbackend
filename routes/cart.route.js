import express from "express";
import { viewCourseFromCart, addCourseToCart, removeCourseFromCart,
 } from "../app/controller/cart.controller.js";
const router = express.Router();

router.get("/view/:user_id/:choice_type", viewCourseFromCart);
router.post("/add", addCourseToCart);
router.delete("/remove/:user_id/:course_id/:choice_type", removeCourseFromCart);

export default router;
