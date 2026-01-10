import { status as httpStatus } from "http-status";
import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/database.js";

export const addCourseToCart = async (req, res) => {
    const { user_id, course_id, choice_type } = req.body;
    const qry = `INSERT INTO user_choices SET user_id=?, course_id=?, choice_type=?`;
    try {
        const [rows] = await db.query(qry, [user_id, course_id, choice_type]);
        return res
            .status(httpStatus.OK)
            .json({ status: true, data: rows?.insertId });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};

export const removeCourseToCart = async (req, res) => {
    const { user_id, course_id, choice_type } = req.params;
    const qry = `DELETE FROM user_choices WHERE user_id=? AND course_id=? AND choice_type=?`;
    try {
        const [rows] = await db.query(qry, [ user_id, course_id, choice_type]);
        return res
            .status(httpStatus.OK)
            .json({ status: true, data: rows?.affectedRows });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};