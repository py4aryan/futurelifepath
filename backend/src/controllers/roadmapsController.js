import Roadmap from '../models/Roadmap.js';
import User from '../models/User.js';
import { ErrorResponse } from '../middleware/error.js';

// @desc    Get all roadmaps for the user
// @route   GET /api/roadmaps
// @access  Private
export const getRoadmaps = async (req, res, next) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: roadmaps.length, roadmaps });
  } catch (error) {
    next(error);
  }
};

// @desc    Get active roadmap
// @route   GET /api/roadmaps/active
// @access  Private
export const getActiveRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findOne({ user: req.user.id, isActive: true }).sort({ createdAt: -1 });

    if (!roadmap) {
      return res.status(200).json({ success: true, roadmap: null });
    }

    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single roadmap
// @route   GET /api/roadmaps/:id
// @access  Private
export const getRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findOne({ _id: req.params.id, user: req.user.id });

    if (!roadmap) {
      return next(new ErrorResponse('Roadmap not found', 404));
    }

    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a roadmap
// @route   POST /api/roadmaps
// @access  Private
export const createRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a roadmap
// @route   PUT /api/roadmaps/:id
// @access  Private
export const updateRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!roadmap) {
      return next(new ErrorResponse('Roadmap not found', 404));
    }

    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a roadmap
// @route   DELETE /api/roadmaps/:id
// @access  Private
export const deleteRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!roadmap) {
      return next(new ErrorResponse('Roadmap not found', 404));
    }

    res.status(200).json({ success: true, message: 'Roadmap deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete a stage in a roadmap and unlock the next one
// @route   PUT /api/roadmaps/:id/stages/:stageId/complete
// @access  Private
export const completeStage = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findOne({ _id: req.params.id, user: req.user.id });

    if (!roadmap) {
      return next(new ErrorResponse('Roadmap not found', 404));
    }

    const stageIndex = roadmap.stages.findIndex(s => s._id.toString() === req.params.stageId);

    if (stageIndex === -1) {
      return next(new ErrorResponse('Stage not found', 404));
    }

    const stage = roadmap.stages[stageIndex];

    if (stage.status === 'completed') {
      return next(new ErrorResponse('Stage already completed', 400));
    }

    if (stage.status === 'locked') {
      return next(new ErrorResponse('Stage is still locked', 400));
    }

    // Mark stage complete
    roadmap.stages[stageIndex].status = 'completed';
    roadmap.stages[stageIndex].completedAt = new Date();

    // Unlock next stage
    if (stageIndex + 1 < roadmap.stages.length) {
      roadmap.stages[stageIndex + 1].status = 'current';
    }

    await roadmap.save();

    // Award XP
    const user = await User.findById(req.user.id);
    const { xp, level } = user.addXP(stage.xp);

    // Update mountain progress on user
    const progressPercent = roadmap.progressPercent;
    user.mountainProgress = progressPercent;
    await user.save();

    res.status(200).json({
      success: true,
      roadmap,
      xpGained: stage.xp,
      user: { xp, level, mountainProgress: progressPercent }
    });
  } catch (error) {
    next(error);
  }
};