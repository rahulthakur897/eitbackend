import dotenv from 'dotenv';
import hostingerTransporter from "../../config/hostinger.js";
import { enquiryTemplate, itForm } from "../../template/eia/index.js";
dotenv.config();

export const sendEnquiryEmail = async (req, res) => {
  const { name, email, phonenumber, course, message } = req.body;
  // Email to yourself
  const notifyMe = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `New Enquiry from ${name}`,
    html: enquiryTemplate({ name, email, phonenumber, course, message }),
  };
  // Confirmation email to sender
  const confirmSender = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Thanks for contacting us!',
    text: `Hi ${name},\n\nThanks for reaching out. We’ve received your message and will get back to you shortly.\n\nYour message:\n"${message}"\n\n— The EIT Team`
  };
  const transporter = hostingerTransporter;
  try {
    await transporter.sendMail(notifyMe);
    await transporter.sendMail(confirmSender);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendItformEmail = async (req, res) => {
  const { fullName, email, contactNumber, companyName, message } = req.body;
  // Email to yourself
  const notifyMe = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `New IT Form Submission from ${fullName}`,
    html: itForm({ fullName, email, contactNumber, companyName, message }),
  };
  // Confirmation email to sender
  const confirmSender = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Thanks for contacting us!',
    text: `Hi ${name},\n\nThanks for reaching out. We’ve received your message and will get back to you shortly.\n\nYour message:\n"${message}"\n\n— The EIT Team`
  };
  const transporter = hostingerTransporter;
  try {
    await transporter.sendMail(notifyMe);
    await transporter.sendMail(confirmSender);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
