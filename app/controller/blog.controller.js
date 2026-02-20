import { status as httpStatus } from "http-status";
import dotenv from "dotenv";
dotenv.config();
import db from "../../config/database.js";
import { buildQuery, cleanObject } from "../utils/common.js";
import formidable, {errors as formidableErrors} from 'formidable';
import fs from "fs";
import path from "path";

  export const getAllBlog = async (req, res) => {
    const qry = `SELECT * FROM blog ORDER BY id DESC`;
    try {
      const [rows] = await db.query(qry);
      return res.status(httpStatus.OK).json({ status: true, data: rows });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    }
  };

export const getBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  const qry = `SELECT * FROM blog WHERE slug = ?`;
  try {
    const [rows] = await db.query(qry, [slug]);
    if (rows.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({ status: false, message: "Blog not found" });
    }
    return res.status(httpStatus.OK).json({ status: true, data: rows[0] });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
}

export const updateBlog = async (req, res) => {
  const { id, ...rest } = req.body;
  const updateQuery = buildQuery(cleanObject(rest));
  const qry = `UPDATE blog SET ${updateQuery} WHERE id = ?`;

  try {
    const [rows] = await db.query(qry, [id]);
    if (rows.affectedRows === 0) {
      return res.status(httpStatus.NOT_FOUND).json({ status: false, message: "Blog not found" });
    }
    return res.status(httpStatus.OK).json({ status: true, message: "Blog updated successfully", data: req.body });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
}

export const addBlog = async (req, res) => {
  const updateQuery = buildQuery(cleanObject(req.body));
  const qry = `INSERT INTO blog SET ${updateQuery}`;

  try {
    const [rows] = await db.query(qry);
    return res.status(httpStatus.OK)
    .json({ status: true, message: "Blog added successfully", data: rows?.insertId  });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    const qry = `DELETE FROM blog WHERE id=${id} `;
    try {
      const [rows] = await db.query(qry);
      console.log(rows);
      if (rows.affectedRows === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ status: false, message: "Blog not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: true, message:"Blog deleted successfully", data: id });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    } 
};