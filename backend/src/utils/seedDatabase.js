import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Skill from '../models/Skill.js';
import Roadmap from '../models/Roadmap.js';
import LockedApp from '../models/LockedApp.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Skill.deleteMany({}),
    Roadmap.deleteMany({}),
    LockedApp.deleteMany({})
  ]);
  console.log('🗑️  Cleared existing data');

  // Create demo user
  const user = await User.create({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    plan: 'premium',
    level: 7,
    xp: 2450,
    streak: 12,
    mountainProgress: 42,
    onboardingCompleted: true
  });
  console.log(`👤 Created user: ${user.email}`);

  // Seed daily skills for today
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  await Skill.insertMany([
    {
      user: user._id,
      title: 'Morning Intention Setting',
      description: 'Write down your top 3 priorities for today and visualize completing them successfully.',
      type: 'habit',
      duration: '5 min',
      xp: 30,
      scheduledFor: today
    },
    {
      user: user._id,
      title: 'Deep Work Session',
      description: 'Focus on your most important task for 25 minutes without distractions.',
      type: 'main',
      duration: '25 min',
      xp: 100,
      scheduledFor: today
    },
    {
      user: user._id,
      title: 'Learn a New Concept',
      description: 'Read one article or watch one video about a skill you\'re developing.',
      type: 'challenge',
      duration: '15 min',
      xp: 50,
      optional: true,
      scheduledFor: today
    }
  ]);
  console.log('📋 Seeded skills');

  // Seed roadmap
  await Roadmap.create({
    user: user._id,
    title: 'Software Engineering Lead',
    description: 'Your personalized path to becoming an engineering lead',
    category: 'career',
    priority: 'high',
    isActive: true,
    stages: [
      { title: 'Complete Online Leadership Course', description: 'Take a comprehensive course on engineering leadership fundamentals', duration: 'Month 1-2', xp: 500, category: 'skills', status: 'completed', reward: 'Leadership Badge', order: 0 },
      { title: 'Build Daily Reading Habit', description: 'Read 30 minutes of leadership and management books daily', duration: 'Month 1-3', xp: 300, category: 'habits', status: 'completed', reward: 'Book Worm Title', order: 1 },
      { title: 'Lead Your First Project', description: 'Volunteer to lead a small team project at your current role', duration: 'Month 3-6', xp: 750, category: 'academics', status: 'current', reward: 'Project Leader Badge', order: 2 },
      { title: 'Earn Management Certification', description: 'Complete a recognized management certification program', duration: 'Month 6-9', xp: 1000, category: 'academics', status: 'locked', reward: 'Certified Manager', order: 3 },
      { title: 'Develop 1:1 Coaching Skills', description: 'Practice giving feedback and mentoring junior team members', duration: 'Month 6-12', xp: 600, category: 'mindset', status: 'locked', reward: 'Mentor Badge', order: 4 },
      { title: 'Apply for Team Lead Positions', description: 'Start applying for engineering manager or team lead roles', duration: 'Month 12-18', xp: 1500, category: 'skills', status: 'locked', reward: 'Career Climber', order: 5 }
    ]
  });
  console.log('🗺️  Seeded roadmap');

  // Seed locked apps
  await LockedApp.insertMany([
    { user: user._id, name: 'Instagram', icon: '📸', isLocked: true, unlockCondition: 'Complete all required skills', dailyTimeLimit: 30 },
    { user: user._id, name: 'TikTok', icon: '🎵', isLocked: true, unlockCondition: 'Complete all required skills', dailyTimeLimit: 30 },
    { user: user._id, name: 'YouTube', icon: '▶️', isLocked: false, unlockCondition: 'Complete all required skills', dailyTimeLimit: 60 },
    { user: user._id, name: 'Twitter', icon: '🐦', isLocked: false, unlockCondition: 'Complete all required skills', dailyTimeLimit: 30 }
  ]);
  console.log('📱 Seeded locked apps');

  console.log('\n✨ Seed complete!');
  console.log('   Login: alex@example.com / password123');
  process.exit(0);
};

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});