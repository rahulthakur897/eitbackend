import express from "express";
import { sendEnquiryEmail, sendItformEmail } from "../app/controller/mail.controller.js";
const router = express.Router();

router.post("/enquiry", sendEnquiryEmail);
router.post("/itform", sendItformEmail);

export default router;
