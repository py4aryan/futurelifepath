import express from 'express';
import {
  getSkills,
  getTodaySkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  completeSkill
} from '../controllers/skillsController.js';
import { protect } from '../middleware/auth.js';
import { skillValidation, validate } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.get('/today', getTodaySkills);
router.get('/', getSkills);
router.get('/:id', getSkill);
router.post('/', skillValidation, validate, createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);
router.put('/:id/complete', completeSkill);

export default router;