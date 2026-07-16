import Progress from '../models/Progress.js';
import Skill from '../models/Skill.js';
import User from '../models/User.js';
import { ErrorResponse } from '../middleware/error.js';

const startOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// @desc    Get progress summary for the user (streak, XP, level, achievements)
// @route   GET /api/progress/summary
// @access  Private
export const getProgressSummary = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // Total skills completed ever
    const totalSkillsCompleted = await Skill.countDocuments({
      user: req.user.id,
      completed: true
    });

    // Weekly progress (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weeklyProgress = await Progress.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });

    // Build 7-day array
    const weeklyData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);

      const record = weeklyProgress.find(p => {
        const pDate = new Date(p.date);
        pDate.setHours(0, 0, 0, 0);
        return pDate.getTime() === d.getTime();
      });

      weeklyData.push({
        day: days[d.getDay()],
        date: d.toISOString().split('T')[0],
        completed: record ? record.skillsCompleted : 0,
        total: record ? record.skillsTotal : 0,
        xpEarned: record ? record.xpEarned : 0
      });
    }

    const weeklyCompletion = weeklyData.reduce((sum, d) => sum + (d.total > 0 ? d.completed / d.total : 0), 0);
    const weeklyCompletionRate = Math.round((weeklyCompletion / 7) * 100);
    const weeklyXP = weeklyData.reduce((sum, d) => sum + d.xpEarned, 0);

    res.status(200).json({
      success: true,
      summary: {
        streak: user.streak,
        totalXP: user.xp,
        level: user.level,
        xpToNextLevel: user.xpToNextLevel,
        totalSkillsCompleted,
        mountainProgress: user.mountainProgress,
        weeklyData,
        weeklyCompletionRate,
        weeklyXP,
        daysJoined: user.daysJoined
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get progress records (paginated)
// @route   GET /api/progress
// @access  Private
export const getProgressRecords = async (req, res, next) => {
  try {
    const { startDate, endDate, page = 1, limit = 30 } = req.query;
    const filter = { user: req.user.id };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Progress.countDocuments(filter);
    const records = await Progress.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: records.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      records
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's progress
// @route   GET /api/progress/today
// @access  Private
export const getTodayProgress = async (req, res, next) => {
  try {
    const today = startOfDay();

    const record = await Progress.findOne({ user: req.user.id, date: today });

    // Also compute live today's skills status
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const todaySkills = await Skill.find({
      user: req.user.id,
      scheduledFor: { $gte: today, $lte: todayEnd }
    });

    const completed = todaySkills.filter(s => s.completed).length;
    const total = todaySkills.length;

    res.status(200).json({
      success: true,
      today: {
        skillsCompleted: completed,
        skillsTotal: total,
        xpEarned: record ? record.xpEarned : 0,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get achievements for the user
// @route   GET /api/progress/achievements
// @access  Private
export const getAchievements = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const totalSkillsCompleted = await Skill.countDocuments({ user: req.user.id, completed: true });

    // Define achievement rules
    const achievements = [
      {
        id: 'first_summit',
        title: 'First Summit',
        description: 'Complete your first skill',
        icon: 'Mountain',
        unlocked: totalSkillsCompleted >= 1
      },
      {
        id: 'week_warrior',
        title: 'Week Warrior',
        description: '7-day streak',
        icon: 'Flame',
        unlocked: user.streak >= 7
      },
      {
        id: 'skill_master',
        title: 'Skill Master',
        description: 'Complete 50 skills',
        icon: 'Zap',
        unlocked: totalSkillsCompleted >= 50
      },
      {
        id: 'peak_performer',
        title: 'Peak Performer',
        description: 'Reach level 10',
        icon: 'Trophy',
        unlocked: user.level >= 10
      },
      {
        id: 'centurion',
        title: 'Centurion',
        description: '100-day streak',
        icon: 'Award',
        unlocked: user.streak >= 100
      },
      {
        id: 'xp_legend',
        title: 'XP Legend',
        description: 'Earn 10,000 XP',
        icon: 'Star',
        unlocked: user.xp >= 10000
      }
    ];

    res.status(200).json({ success: true, achievements });
  } catch (error) {
    next(error);
  }
};