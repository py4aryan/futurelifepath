import express from 'express';
import {
  getProgressSummary,
  getProgressRecords,
  getTodayProgress,
  getAchievements
} from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/summary', getProgressSummary);
router.get('/today', getTodayProgress);
router.get('/achievements', getAchievements);
router.get('/', getProgressRecords);

export default router;