import { Router } from 'express';
import { syncToCRM } from '../controllers/salesforce.controller';
// @ts-ignore
import { requireAuth } from '../middleware/auth.middlware'; 

const router = Router();

router.post('/sync', requireAuth(), syncToCRM);

export default router;
