import { status as httpStatus } from "http-status";
import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/database.js";

export const getCategories = async (req, res) => {
    const qry = `SELECT id, name FROM categories ORDER BY id DESC`;
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

export const addCategory = async (req, res) => {
    const { name } = req.body;
    const qry = `INSERT INTO categories SET name=?`;
    try {
        const [rows] = await db.query(qry, [name]);
        return res
            .status(httpStatus.OK)
            .json({ status: true, data: rows?.insertId });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};

export const updateCategory = async (req, res) => {
    const { id, name } = req.body;
    const qry = `UPDATE categories SET name=? WHERE id=?`;
    try {
        const [rows] = await db.query(qry, [    , id]);
        return res
            .status(httpStatus.OK)
            .json({ status: true, data: rows?.affectedRows });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const qry = `DELETE FROM categories WHERE id=?`;
    try {
        const [rows] = await db.query(qry, [id]);
        return res
            .status(httpStatus.OK)
            .json({ status: true, data: rows?.affectedRows });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};

export const getCategoryCourses = async (req, res) => {
    const { categoryIds } = req.body;
    const qry = `SELECT id, category_id, name, course_logo, price from courses WHERE category_id IN (?) ORDER BY id desc`;
    try {
        const [rows] = await db.query(qry, [categoryIds]);
        return res
            .status(httpStatus.OK)
            .json({ status: true, data: rows });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};
