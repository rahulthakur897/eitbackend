import { status as httpStatus } from "http-status";
import dotenv from "dotenv";
dotenv.config();
import db from "../../config/database.js";
import { buildQuery, cleanObject } from "../utils/common.js";
import formidable, {errors as formidableErrors} from 'formidable';
import fs from "fs";
import path from "path";

export const getPopularCourses = async (req, res) => {
  const qry = `SELECT id, name, course_logo FROM courses ORDER BY id DESC`;
  try {
    const [rows] = await db.query(qry);
    return res.status(httpStatus.OK).json({ status: true, data: rows });
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
    return res.status(httpStatus.OK).json({ status: true, data: rows });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
};

export const getCourseDetail = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await courseDetail(id);
  if (status) {
    return res.status(httpStatus.OK).json({ status: true, data: data });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
};

export const courseDetail = async (courseId) => {
  const qry = `SELECT * FROM courses WHERE id=?`;
  try {
    const [rows] = await db.query(qry, [courseId]);
    return { status: true, data: rows[0] };
  } catch (err) {
    return { status: false, message: err.message };
  }
};

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
          courses: coursesList.length ? coursesList : [],
        };
      })
    );
    return res.status(httpStatus.OK).json({ status: true, data: resultArray });
  } catch (err) {
    console.error(err);
    return res
      .status(httpStatus.OK)
      .json({ status: false, message: err.message });
  }
};

export const getCourseByCategory = async (categoryId) => {
  const qry = `SELECT id, name, slug FROM courses WHERE category_id = ?`;
  try {
    const [rows] = await db.query(qry, [categoryId]);
    return rows;
  } catch (err) {
    console.error(err);
    return { status: false, message: err.message };
  }
};

export const addCourse = async (req, res) => {
    const generatedQry = buildQuery(req.body);
    const qry = `INSERT INTO courses SET ${generatedQry} `;
    try {
      const [rows] = await db.query(qry);
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: rows?.insertId });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    } 
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const qry = `DELETE FROM courses WHERE id=${id} `;
    try {
      const [rows] = await db.query(qry);
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: id });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    } 
};

export const updateCourse = async (req, res) => {
  const {id, ...rest}  = req.body;
  const cleanObjectData = cleanObject(rest);
    const generatedQry = buildQuery(cleanObjectData);
    const qry = `UPDATE courses SET ${generatedQry} WHERE id = ?`;
 
    try {
      const [rows] = await db.query(qry, [id]);
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: id });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    } 
};

export const getUpcomingCourses = async (req, res) => {
  const qry = `SELECT * FROM upcoming_course ORDER BY id DESC`;
  try {
    const [rows] = await db.query(qry);
    return res.status(httpStatus.OK).json({ status: true, data: rows });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
};

export const addUpcomingCourses = async (req, res) => {
    const generatedQry = buildQuery(req.body);
    const qry = `INSERT INTO upcoming_course SET ${generatedQry} `;
    try {
      const [rows] = await db.query(qry);
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: rows?.insertId });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    } 
};

export const updateUpcomingCourses = async (req, res) => {
  const {id, ...rest}  = req.body;
  const cleanObjectData = cleanObject(rest);
    const generatedQry = buildQuery(cleanObjectData);
    const qry = `UPDATE upcoming_course SET ${generatedQry} WHERE id = ?`;
    try {
      const [rows] = await db.query(qry, [id]);
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: id });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    } 
};

export const deleteUpComingCourse = async (req, res) => {
    const { id } = req.params;
    const qry = `DELETE FROM upcoming_course WHERE id=${id} `;
    try {
      const [rows] = await db.query(qry);
      return res
        .status(httpStatus.OK)
        .json({ status: true, data: id });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    } 
};