import express from 'express';
import mailRoutes from './mail.route.js';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import categoryRoutes from './category.route.js';
import courseRoutes from './course.route.js';
import cart from './cart.route.js';

const router = express.Router();

router.use('/mail', mailRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/course', courseRoutes);
router.use('/cart', cart);

export default router;
