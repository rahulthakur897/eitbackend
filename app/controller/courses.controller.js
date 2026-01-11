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

export const getAllCourses = async (req, res) => {
  const qry = `SELECT * FROM courses ORDER BY id DESC`;
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

export const getCourseDetail = async (courseId) => {
  const qry = `SELECT * FROM courses WHERE id=?`;
  try {
    const [rows] = await db.query(qry, [courseId]);
    return { status: true, data: rows };
  } catch (err) {
    return { status: false, message: err.message };
  }
}

export const getCourseMenu = async (req, res) => {
  const qry = `SELECT id, name FROM categories`;
  try {
    const [rows] = await db.query(qry);
    if (!rows.length) {
      return { status: true, data: [] };
    }
    const resultArray = await Promise.all(
      rows.map(async (row) => {
        const coursesList = await getCourseByCategory(row.id);
        return {
          id: row.id,
          name: row.name,
          courses:  coursesList.length? coursesList : []
        };
      })
    );
 return res
      .status(httpStatus.OK)
      .json({ status: true, data: resultArray });
   
  } catch (err) {
    console.error(err);
    return res
      .status(httpStatus.OK)
      .json({ status: false, message: err.message});
  }
};

export const getCourseByCategory = async (categoryId) => {
  const qry = `SELECT name, slug FROM courses WHERE category_id = ?`;
  try {
    const [rows] = await db.query(qry, [categoryId]);
    return rows ;
  } catch (err) {
    console.error(err);
    return { status: false, message: err.message };
  }
};
