import { status as httpStatus } from "http-status";
import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/database.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const qry = `SELECT id, name, contact, user_type, email, profile_photo FROM users WHERE email=${email} AND password=${password}`;
  try {
    const [rows] = await db.query(qry);
    if(rows?.length){
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
