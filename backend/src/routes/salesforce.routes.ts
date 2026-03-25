import {Router} from 'express';
import {syncToCRM} from '../controllers/salesforce.controller';

const router = Router();

router.post('/sync', syncToCRM);

export default router;
