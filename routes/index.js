import express from 'express';
import eiaRoutes from './eia.route.js';
const router = express.Router();

router.use('/eia', eiaRoutes);

export default router;
