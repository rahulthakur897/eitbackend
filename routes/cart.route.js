import express from "express";
import { addCourseToCart, removeCourseToCart
 } from "../app/controller/cart.controller.js";
const router = express.Router();

router.post("/add", addCourseToCart);
router.delete("/delete/:id", removeCourseToCart);
export default router;
