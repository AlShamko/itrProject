import { Router } from 'express';
import { createSupportTicket } from '../controllers/support.controller';

const router = Router();

router.post('/', createSupportTicket);

export default router;
