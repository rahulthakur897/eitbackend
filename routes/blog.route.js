import express from "express";
import { getAllBlog, getBlogBySlug, addBlog, updateBlog, deleteBlog } from "../app/controller/blog.controller.js";
const router = express.Router();

// router.get("/learning/:userId", getMyCourses);
// router.get("/wishlist/:userId", getMyWishlistCourses);
// router.get("/cart/:userId", getMyCartCourses);
router.get("/all", getAllBlog);
router.get("/:slug", getBlogBySlug);
router.post("/add", addBlog);
router.patch("/update", updateBlog );
router.delete("/delete/:id", deleteBlog);
export default router;
