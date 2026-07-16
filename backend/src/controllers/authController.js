import crypto from 'crypto';
import User from '../models/User.js';
import Skill from '../models/Skill.js';
import { ErrorResponse } from '../middleware/error.js';
import { generateDailyQuests } from '../utils/questLibrary.js';

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateAuthToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };
  user.password = undefined;
  res.status(statusCode).cookie('token', token, options).json({ success: true, token, user });
};

// @route POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new ErrorResponse('Email already registered', 400));
    const user = await User.create({ name, email, password });
    sendTokenResponse(user, 201, res);
  } catch (error) { next(error); }
};

// @route POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new ErrorResponse('Invalid credentials', 401));
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));
    user.updateStreak();
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (error) { next(error); }
};

// @route POST /api/auth/logout
export const logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) { next(error); }
};

// @route GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) { next(error); }
};

// @route PUT /api/auth/updatedetails
export const updateDetails = async (req, res, next) => {
  try {
    const fields = { name: req.body.name, email: req.body.email, avatar: req.body.avatar };
    Object.keys(fields).forEach(k => fields[k] === undefined && delete fields[k]);
    const user = await User.findByIdAndUpdate(req.user.id, fields, { new: true, runValidators: true });
    res.status(200).json({ success: true, user });
  } catch (error) { next(error); }
};

// @route PUT /api/auth/updatepassword
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    if (!(await user.comparePassword(req.body.currentPassword)))
      return next(new ErrorResponse('Password is incorrect', 401));
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (error) { next(error); }
};

// @route PUT /api/auth/preferences
export const updatePreferences = async (req, res, next) => {
  try {
    const { notificationsEnabled, appLockEnabled, theme } = req.body;
    const user = await User.findById(req.user.id);
    if (notificationsEnabled !== undefined) user.preferences.notificationsEnabled = notificationsEnabled;
    if (appLockEnabled       !== undefined) user.preferences.appLockEnabled       = appLockEnabled;
    if (theme                !== undefined) user.preferences.theme                = theme;
    await user.save();
    res.status(200).json({ success: true, preferences: user.preferences });
  } catch (error) { next(error); }
};

// @route PUT /api/auth/complete-onboarding
// Saves survey answers AND generates first set of personalised daily quests
export const completeOnboarding = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const { goals = [], interests = [], strengths = [], weaknesses = [], currentSituation = '', struggles = [] } = req.body;

    // Persist the survey profile on the user document
    user.onboardingProfile  = { goals, interests, strengths, weaknesses, currentSituation, struggles };
    user.onboardingCompleted = true;
    await user.save();

    // Delete any existing skills for today (fresh personalised start)
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd   = new Date(); todayEnd.setHours(23, 59, 59, 999);
    await Skill.deleteMany({ user: user._id, scheduledFor: { $gte: todayStart, $lte: todayEnd } });

    // Generate personalised quests and save them
    const scheduledFor = new Date(); scheduledFor.setHours(12, 0, 0, 0);
    const quests = generateDailyQuests({ goals, interests, strengths, weaknesses, currentSituation, struggles });

    await Skill.insertMany(quests.map(q => ({
      user: user._id,
      title:       q.title,
      description: q.description,
      type:        q.type,
      duration:    q.duration,
      xp:          q.xp,
      category:    q.category,
      difficulty:  q.difficulty,
      optional:    q.optional,
      scheduledFor,
    })));

    res.status(200).json({ success: true, message: 'Onboarding completed', user });
  } catch (error) { next(error); }
};

// @route POST /api/auth/forgotpassword
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorResponse('No account found with that email', 404));
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;
    // TODO: replace with nodemailer in production
    res.status(200).json({ success: true, message: 'Password reset link generated', resetUrl });
  } catch (error) {
    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });
      if (user) { user.resetPasswordToken = undefined; user.resetPasswordExpire = undefined; await user.save({ validateBeforeSave: false }); }
    }
    next(error);
  }
};

// @route PUT /api/auth/resetpassword/:resettoken
export const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
    const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return next(new ErrorResponse('Invalid or expired reset link', 400));
    user.password            = req.body.password;
    user.resetPasswordToken  = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (error) { next(error); }
};
