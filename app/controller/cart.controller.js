import { status as httpStatus } from "http-status";
import dotenv from 'dotenv';
dotenv.config();
import db from "../../config/database.js";
import { courseDetail } from "./courses.controller.js";
import _ from "lodash";

export const viewCourseFromCart = async (req, res) => {
    const { user_id, choice_type } = req.params;
    const qry = `SELECT course_id FROM user_choices WHERE user_id=? AND choice_type=?`;
    try {
        const [rows] = await db.query(qry, [user_id, choice_type]);
        if(rows?.length){
            const uniqRows = _.uniqBy(rows, 'course_id');
            const courses = await Promise.all(
                uniqRows.map(async ({ course_id }) => {
                    const { data } = await courseDetail(course_id);
                    return data;
                })
            );
            return res.status(httpStatus.OK).json({
                status: true,
                data: courses,
            });
        } else {
            return res.status(httpStatus.OK).json({
                status: true,
                data: [],
            });
        }
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: err.message });
    }
};

const checkForDups = async (user_id, course_id, choice_type) => {
    try {
        const chkQry = `SELECT * FROM user_choices WHERE user_id=? AND course_id=? AND choice_type=?`;
        const [rows] = await db.query(chkQry, [user_id, course_id, choice_type]);
        if(rows.length){
            return {status: true};
        } else {
            return {status: false};
        }
    } catch (err) {
        return { status: false, message: err.message };
    }
}

export const addCourseToCart = async (req, res) => {
    const { user_id, course_id, choice_type } = req.body;
    // check for course already added
    const {status} = await checkForDups(user_id, course_id, choice_type);
    if(!status){
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
    }
    return res
                .status(httpStatus.OK)
                .json({ status: false, data: [] });
};

export const removeCourseFromCart = async (req, res) => {
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
