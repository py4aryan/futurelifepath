import LockedApp from '../models/LockedApp.js';
import Skill from '../models/Skill.js';
import { ErrorResponse } from '../middleware/error.js';

const startOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// @desc    Get all locked apps for user
// @route   GET /api/locked-apps
// @access  Private
export const getLockedApps = async (req, res, next) => {
  try {
    const apps = await LockedApp.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: apps.length, apps });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a locked app
// @route   POST /api/locked-apps
// @access  Private
export const addLockedApp = async (req, res, next) => {
  try {
    const app = await LockedApp.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({ success: true, app });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a locked app
// @route   PUT /api/locked-apps/:id
// @access  Private
export const updateLockedApp = async (req, res, next) => {
  try {
    const app = await LockedApp.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!app) {
      return next(new ErrorResponse('App not found', 404));
    }

    res.status(200).json({ success: true, app });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a locked app
// @route   DELETE /api/locked-apps/:id
// @access  Private
export const deleteLockedApp = async (req, res, next) => {
  try {
    const app = await LockedApp.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!app) {
      return next(new ErrorResponse('App not found', 404));
    }

    res.status(200).json({ success: true, message: 'App removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Unlock an app (user has completed enough skills today)
// @route   PUT /api/locked-apps/:id/unlock
// @access  Private
export const unlockApp = async (req, res, next) => {
  try {
    const app = await LockedApp.findOne({ _id: req.params.id, user: req.user.id });

    if (!app) {
      return next(new ErrorResponse('App not found', 404));
    }

    // Check if required skills for today are complete
    const today = startOfDay();
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const requiredSkills = await Skill.find({
      user: req.user.id,
      optional: false,
      scheduledFor: { $gte: today, $lte: todayEnd }
    });

    const allRequiredDone = requiredSkills.length > 0
      && requiredSkills.every(s => s.completed);

    if (!allRequiredDone) {
      return next(new ErrorResponse('Complete all required skills to unlock this app', 403));
    }

    // Unlock for the number of minutes specified (or default 60)
    const unlockDurationMins = req.body.durationMinutes || app.dailyTimeLimit || 60;
    app.unlockedUntil = new Date(Date.now() + unlockDurationMins * 60 * 1000);
    app.isLocked = false;
    await app.save();

    res.status(200).json({
      success: true,
      app,
      message: `${app.name} unlocked for ${unlockDurationMins} minutes`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check unlock status of all apps (re-locks expired ones)
// @route   GET /api/locked-apps/status
// @access  Private
export const checkUnlockStatus = async (req, res, next) => {
  try {
    const apps = await LockedApp.find({ user: req.user.id });

    const now = new Date();
    const updates = [];

    for (const app of apps) {
      if (!app.isLocked && app.unlockedUntil && now > app.unlockedUntil) {
        app.isLocked = true;
        app.unlockedUntil = null;
        updates.push(app.save());
      }
    }

    await Promise.all(updates);

    const refreshed = await LockedApp.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, apps: refreshed });
  } catch (error) {
    next(error);
  }
};