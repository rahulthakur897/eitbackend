import { status as httpStatus } from "http-status";
import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/database.js";

export const getPopularCourses = async (req, res) => {
  const qry = `SELECT id, name, course_logo FROM courses ORDER BY id DESC`;
  try {
    const [rows] = await db.query(qry);
    return res
        .status(httpStatus.OK)
        .json({ status: true, data: rows });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
};
