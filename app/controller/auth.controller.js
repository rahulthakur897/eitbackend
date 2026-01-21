import { status as httpStatus } from "http-status";
import md5 from "md5";
import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/database.js";
import { UserType } from "../utils/constant.js";
import {sendForgetPwdEmail} from "./mail.controller.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const hash = md5(password);
  const qry = `SELECT id, name, contact, user_type, email, profile_photo FROM users WHERE email=? AND password=?`;
  try {
    const [rows] = await db.query(qry, [email, hash]);
    if (rows?.length) {
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: rows });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ status: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, contact, email, password } = req.body;
  const hash = md5(password);

  const verifyEmail = `SELECT email FROM users WHERE email=?`;
  try {
    const [rows] = await db.query(verifyEmail, [email]);
    if (rows?.length) {
      return res
        .status(httpStatus.OK)
        .json({ status: false, message: "User already exist" });
    } else {
      const qry = `INSERT INTO users SET name=?, contact=?, user_type=?, email=?, password=?`;
      const [rows] = await db.query(qry, [name, contact, UserType.USER, email, hash]);
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: { userId: rows?.insertId, name: name, contact: contact, email: email } });
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
};

export const forgotPwd = async (req, res) => {
  const { email } = req.body;
  const verifyEmail = `SELECT email FROM users WHERE email=?`;
  try {
    const [rows] = await db.query(verifyEmail, [email]);
    if (rows?.length) {
      //send email logic
      const otp = Math.floor(Math.random() * 9000) + 1000;
      const qry = `UPDATE users SET otp=? WHERE email=?`;
      const [rows] = await db.query(qry, [otp, email]);
      if(rows?.length){
        sendForgetPwdEmail(email, otp);
        console.log("qry afater");
        return res
          .status(httpStatus.OK)
          .json({ status: true });
      }
    } else {
      return res
        .status(httpStatus.OK)
        .json({ status: false, message: "Email does not exist" });
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
};