import Skill from '../models/Skill.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import { ErrorResponse } from '../middleware/error.js';

// Helper: get start of today
const startOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

// @desc    Get today's skills for the logged-in user
// @route   GET /api/skills/today
// @access  Private
export const getTodaySkills = async (req, res, next) => {
  try {
    const today = startOfDay();
    const todayEnd = endOfDay();

    const skills = await Skill.find({
      user: req.user.id,
      scheduledFor: { $gte: today, $lte: todayEnd }
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      skills
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all skills for the logged-in user
// @route   GET /api/skills
// @access  Private
export const getSkills = async (req, res, next) => {
  try {
    const { type, completed, category, startDate, endDate, page = 1, limit = 20 } = req.query;

    const filter = { user: req.user.id };
    if (type) filter.type = type;
    if (completed !== undefined) filter.completed = completed === 'true';
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.scheduledFor = {};
      if (startDate) filter.scheduledFor.$gte = new Date(startDate);
      if (endDate) filter.scheduledFor.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Skill.countDocuments(filter);
    const skills = await Skill.find(filter)
      .sort({ scheduledFor: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: skills.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      skills
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single skill by ID
// @route   GET /api/skills/:id
// @access  Private
export const getSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, user: req.user.id });

    if (!skill) {
      return next(new ErrorResponse('Skill not found', 404));
    }

    res.status(200).json({ success: true, skill });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private
export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({ success: true, skill });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return next(new ErrorResponse('Skill not found', 404));
    }

    res.status(200).json({ success: true, skill });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!skill) {
      return next(new ErrorResponse('Skill not found', 404));
    }

    res.status(200).json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a skill as complete and award XP
// @route   PUT /api/skills/:id/complete
// @access  Private
export const completeSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, user: req.user.id });

    if (!skill) {
      return next(new ErrorResponse('Skill not found', 404));
    }

    if (skill.completed) {
      return next(new ErrorResponse('Skill already completed', 400));
    }

    await skill.markComplete();

    // Award XP to user
    const user = await User.findById(req.user.id);
    const { xp, level } = user.addXP(skill.xp);
    user.updateStreak();
    await user.save();

    // Update daily progress record
    const today = startOfDay();
    const todayEnd = endOfDay();

    const todaySkills = await Skill.find({
      user: req.user.id,
      scheduledFor: { $gte: today, $lte: todayEnd }
    });

    const completedCount = todaySkills.filter(s => s.completed).length;
    const totalCount = todaySkills.length;

    await Progress.findOneAndUpdate(
      { user: req.user.id, date: today },
      {
        $set: { skillsCompleted: completedCount, skillsTotal: totalCount, streakDay: user.streak },
        $inc: { xpEarned: skill.xp },
        $push: {
          skills: {
            skillId: skill._id,
            title: skill.title,
            xp: skill.xp,
            completedAt: skill.completedAt
          }
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      skill,
      xpGained: skill.xp,
      user: { xp, level, streak: user.streak }
    });
  } catch (error) {
    next(error);
  }
};