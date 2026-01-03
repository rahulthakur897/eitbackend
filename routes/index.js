import express from 'express';
import mailRoutes from './mail.route.js';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import categoryRoutes from './category.route.js';
import courseRoutes from './course.route.js';
const router = express.Router();

router.use('/eita/mail', mailRoutes);
router.use('/eita/auth', authRoutes);
router.use('/eita/user', userRoutes);
router.use('/eita/category', categoryRoutes);
router.use('/eita/course', courseRoutes);

export default router;
