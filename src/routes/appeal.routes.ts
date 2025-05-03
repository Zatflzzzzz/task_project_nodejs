// src/routes/appeal.routes.ts
import {Router} from 'express';
import {AppealController} from '../controllers/appeal.controller';

const router = Router();

router.post('/', AppealController.createAppeal);
router.patch('/:id/take', AppealController.takeToWork);
router.patch('/:id/complete', AppealController.complete);
router.patch('/:id/cancel', AppealController.cancel);
router.get('/', AppealController.getAll);
router.post('/actions/cancel-in-progress', AppealController.bulkCancelInProgress);

export default router;