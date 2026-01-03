import express from 'express';
import mailRoutes from './mail.route.js';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import categoryRoutes from './category.route.js';
import courseRoutes from './course.route.js';
const router = express.Router();

router.use('/mail', mailRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/course', courseRoutes);

export default router;
