import { status as httpStatus } from "http-status";
import md5 from "md5";
import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/database.js";
import { UserType } from "../utils/constant.js";
import { generateOTP } from "../utils/common.js";
import {sendVerificationEmail, sendForgetPwdEmail} from "./mail.controller.js";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const hash = md5(password);
  const qry = `SELECT id, name, contact, user_type, email, profile_photo FROM users 
  WHERE email=? AND password=? AND user_type=?`;
  try {
    const [rows] = await db.query(qry, [username, hash, UserType.ADMIN]);
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

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const hash = md5(password);
  const qry = `SELECT id, name, contact, user_type, email, profile_photo FROM users WHERE email=? AND password=? AND is_active=? AND user_type=?`;
  try {
    const [rows] = await db.query(qry, [email, hash, 1, UserType.USER]);
    if (rows?.length) {
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: rows[0] });
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
      const otp = generateOTP();
      const qry = `INSERT INTO users SET name=?, contact=?, user_type=?, email=?, password=?, otp=?`;
      const [rows] = await db.query(qry, [name, contact, UserType.USER, email, hash, otp]);
      sendVerificationEmail(name, email, otp);
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

export const resendOTP = async (req, res) => {
  const { email } = req.body;
  const verifyEmail = `SELECT name, email, otp FROM users WHERE email=?`;
  try {
    const [rows] = await db.query(verifyEmail, [email]);
    if (rows?.length) {
      const {name, otp} = rows[0];
      sendVerificationEmail(name, email, otp);
      return res
        .status(httpStatus.OK)
        .json({ status: true, message: "OTP send" });
    } else {
      return res
        .status(httpStatus.OK)
        .json({ status: false, message: "Invalid data" });
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const verifyEmail = `SELECT id, name, contact, email, otp FROM users WHERE email=? AND is_active=?`;
  try {
    const [rows] = await db.query(verifyEmail, [email, 0]);
    if (rows?.length) {
      if(otp === rows[0]['otp']){
        const qry = `UPDATE users SET is_active=? WHERE email=?`;
        db.query(qry, [1, email]);
        return res
          .status(httpStatus.OK)
          .json({ status: true, data: { userId: rows[0]['id'], name: rows[0]['name'], contact: rows[0]['contact'], email: rows[0]['email'] } });
      } else {
        return res
          .status(httpStatus.OK)
          .json({ status: false, message: "Incorrect OTP" });
      }
    }
    return res
      .status(httpStatus.OK)
      .json({ status: false, message: "Invalid email" });
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