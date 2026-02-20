import express from "express";
import { getAllEnquiry, addEnquiry, updateEnquiry, deleteEnquiry } from "../app/controller/enquiry.controller.js";
const router = express.Router();

router.get("/all", getAllEnquiry);
router.post("/add", addEnquiry);
router.patch("/update", updateEnquiry );
router.delete("/delete/:id", deleteEnquiry);
export default router;
