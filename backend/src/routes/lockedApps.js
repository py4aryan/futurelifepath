import express from 'express';
import {
  getLockedApps,
  addLockedApp,
  updateLockedApp,
  deleteLockedApp,
  unlockApp,
  checkUnlockStatus
} from '../controllers/lockedAppsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/status', checkUnlockStatus);
router.get('/', getLockedApps);
router.post('/', addLockedApp);
router.put('/:id', updateLockedApp);
router.delete('/:id', deleteLockedApp);
router.put('/:id/unlock', unlockApp);

export default router;