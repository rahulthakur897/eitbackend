import express from "express";
import { getMyCourses, getMyWishlistCourses, getMyCartCourses } from "../app/controller/user.controller.js";
const router = express.Router();

router.get("/learning/:userId", getMyCourses);
router.get("/wishlist/:userId", getMyWishlistCourses);
router.get("/cart/:userId", getMyCartCourses);

export default router;
