import express from 'express';
import {
  getRoadmaps,
  getActiveRoadmap,
  getRoadmap,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
  completeStage
} from '../controllers/roadmapsController.js';
import { protect } from '../middleware/auth.js';
import { roadmapValidation, validate } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.get('/active', getActiveRoadmap);
router.get('/', getRoadmaps);
router.get('/:id', getRoadmap);
router.post('/', roadmapValidation, validate, createRoadmap);
router.put('/:id', updateRoadmap);
router.delete('/:id', deleteRoadmap);
router.put('/:id/stages/:stageId/complete', completeStage);

export default router;