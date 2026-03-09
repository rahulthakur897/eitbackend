import express from "express";
import { getMyCourses, getMyWishlistCourses, getMyCartCourses, getInstructors, updateUserProfile } from "../app/controller/user.controller.js";
const router = express.Router();

router.get("/learning/:userId", getMyCourses);
router.get("/wishlist/:userId", getMyWishlistCourses);
router.get("/cart/:userId", getMyCartCourses);
router.get("/instructors", getInstructors);
router.post("/profile/update", updateUserProfile);

export default router;
