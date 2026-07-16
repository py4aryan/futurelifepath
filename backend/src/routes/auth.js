import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  updatePreferences,
  completeOnboarding,
forgotPassword,
resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { 
  registerValidation, 
  loginValidation, 
  updateProfileValidation,
  validate 
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/forgotpassword', forgotPassword);   // ← ADD THIS
router.put('/resetpassword/:resettoken', resetPassword);
// Protected routes
router.use(protect); // All routes below require authentication

router.post('/logout', logout);
router.get('/me', getMe);
router.put('/updatedetails', updateProfileValidation, validate, updateDetails);
router.put('/updatepassword', updatePassword);
router.put('/preferences', updatePreferences);
router.put('/complete-onboarding', completeOnboarding);

export default router;