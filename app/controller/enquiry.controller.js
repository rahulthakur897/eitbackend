import { status as httpStatus } from "http-status";
import dotenv from "dotenv";
dotenv.config();
import db from "../../config/database.js";
import { buildQuery, cleanObject } from "../utils/common.js";

  export const getAllEnquiry = async (req, res) => {
    const qry = `SELECT * FROM enquiry ORDER BY id DESC`;
    try {
      const [rows] = await db.query(qry);
      return res.status(httpStatus.OK).json({ status: true, data: rows });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    }
  };


export const updateEnquiry = async (req, res) => {
  const { id, ...rest } = req.body;
  const updateQuery = buildQuery(cleanObject(rest));
  const qry = `UPDATE enquiry SET ${updateQuery} WHERE id = ?`;

  try {
    const [rows] = await db.query(qry, [id]);
    if (rows.affectedRows === 0) {
      return res.status(httpStatus.NOT_FOUND).json({ status: false, message: "Enquiry not found" });
    }
    return res.status(httpStatus.OK).json({ status: true, message: "Enquiry updated successfully", data: req.body });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
}

export const addEnquiry = async (req, res) => {
  const updateQuery = buildQuery(cleanObject(req.body));
  const qry = `INSERT INTO enquiry SET ${updateQuery}`;

  try {
    const [rows] = await db.query(qry);
    return res.status(httpStatus.OK)
    .json({ status: true, message: "Enquiry added successfully", data: rows?.insertId  });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: err.message });
  }
}

export const deleteEnquiry = async (req, res) => {
    const { id } = req.params;
    const qry = `DELETE FROM enquiry WHERE id=${id} `;
    try {
      const [rows] = await db.query(qry);
      if (rows.affectedRows === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ status: false, message: "Enquiry not found" });
      }
      return res
        .status(httpStatus.OK)
        .json({ status: true, message:"Enquiry deleted successfully", data: id });
    } catch (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
    } 
};