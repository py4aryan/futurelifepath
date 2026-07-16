import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  avatar: { type: String, default: '' },
  plan: { type: String, enum: ['free', 'regular', 'premium'], default: 'free' },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: Date.now },
  mountainProgress: { type: Number, default: 0, min: 0, max: 100 },
  onboardingCompleted: { type: Boolean, default: false },

  // Survey answers from onboarding — used to generate personalized quests
  onboardingProfile: {
    goals:            { type: [String], default: [] },
    interests:        { type: [String], default: [] },
    strengths:        { type: [String], default: [] },
    weaknesses:       { type: [String], default: [] },
    currentSituation: { type: String,   default: '' },
    struggles:        { type: [String], default: [] }
  },

  preferences: {
    notificationsEnabled: { type: Boolean, default: true },
    appLockEnabled:       { type: Boolean, default: false },
    theme:                { type: String, enum: ['light', 'dark', 'system'], default: 'system' }
  },
  resetPasswordToken:  String,
  resetPasswordExpire: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON:   { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('xpToNextLevel').get(function () { return this.level * 1000; });
userSchema.virtual('daysJoined').get(function () {
  const ms = Math.abs(new Date() - this.createdAt);
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword   = async function (pw) { return bcrypt.compare(pw, this.password); };
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });
};

userSchema.methods.updateStreak = function () {
  const today      = new Date().setHours(0, 0, 0, 0);
  const lastActive = new Date(this.lastActiveDate).setHours(0, 0, 0, 0);
  const diff       = Math.floor((today - lastActive) / 86400000);
  if      (diff === 0) { /* same day — no change */ }
  else if (diff === 1) { this.streak += 1; }
  else                 { this.streak  = 1; }
  this.lastActiveDate = new Date();
  return this.streak;
};

userSchema.methods.addXP = function (amount) {
  this.xp += amount;
  if (this.xp >= this.level * 1000) this.level += 1;
  return { xp: this.xp, level: this.level };
};

userSchema.methods.getResetPasswordToken = function () {
  const plain = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken  = crypto.createHash('sha256').update(plain).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return plain;
};

export default mongoose.model('User', userSchema);
