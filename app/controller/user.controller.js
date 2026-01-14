import { status as httpStatus } from "http-status";
import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/database.js";
import { courseDetail } from "./courses.controller.js";
import { UserChoice } from "../utils/constant.js";

export const getMyCourses = async (req, res) => {
    const { userId } = req.params;
    const mycourseQry = `SELECT course_id, expiry_date FROM user_courses WHERE user_id=?`;
    try {
        const [rows] = await db.query(mycourseQry, [userId]);
        if (!rows?.length) {
            return res.status(httpStatus.OK).json({
                status: true,
                data: [],
            });
        }
        const courses = await Promise.all(
            rows.map(async ({ course_id }) => {
                const { status, data } = await courseDetail(course_id);
                return status ? data : null;
            })
        );
        const myCourses = courses.filter(Boolean);
        return res.status(httpStatus.OK).json({
            status: true,
            data: myCourses,
        });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};

export const getMyWishlistCourses = async (req, res) => {
    const { userId } = req.params;
    const mycourseQry = `SELECT course_id FROM user_choices WHERE user_id=? AND choice_type=?`;
    try {
        const [rows] = await db.query(mycourseQry, [userId, UserChoice.WISHLIST]);
        if (!rows?.length) {
            return res.status(httpStatus.OK).json({
                status: true,
                data: [],
            });
        }
        const courses = await Promise.all(
            rows.map(async ({ course_id }) => {
                const { status, data } = await getCourseDetail(course_id);
                return status ? data : null;
            })
        );
        const myCourses = courses.filter(Boolean);
        return res.status(httpStatus.OK).json({
            status: true,
            data: myCourses,
        });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};

export const getMyCartCourses = async (req, res) => {
    const { userId } = req.params;
    const mycourseQry = `SELECT course_id FROM user_choices WHERE user_id=? AND choice_type=?`;
    try {
        const [rows] = await db.query(mycourseQry, [userId, UserChoice.CART]);
        if (!rows?.length) {
            return res.status(httpStatus.OK).json({
                status: true,
                data: [],
            });
        }
        const courses = await Promise.all(
            rows.map(async ({ course_id }) => {
                const { status, data } = await getCourseDetail(course_id);
                return status ? data : null;
            })
        );
        const myCourses = courses.filter(Boolean);
        return res.status(httpStatus.OK).json({
            status: true,
            data: myCourses,
        });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};

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
    const { id } = req.params;
    const qry = `DELETE FROM user_choices WHERE id=?`;
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