import express from 'express';
import eiaWebsiteRoutes from './eiaWebsite.route.js';
import eiaAcademyRoutes from './eiaAcademy.route.js';
import eiaAcademyAdminRoutes from './eiaAcademyAdmin.route.js';
const router = express.Router();

router.use('/eia', eiaWebsiteRoutes);
router.use('/eit/academy', eiaAcademyRoutes);
router.use('/eit/academy/admin', eiaAcademyAdminRoutes);

export default router;
