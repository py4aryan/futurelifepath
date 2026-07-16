import mongoose from 'mongoose';

const lockedAppSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'App name is required'],
    trim: true,
    maxlength: [50, 'App name cannot exceed 50 characters']
  },
  icon: {
    type: String,
    default: '📱'
  },
  packageName: {
    type: String,
    trim: true,
    default: ''
  },
  isLocked: {
    type: Boolean,
    default: true
  },
  unlockedUntil: {
    type: Date,
    default: null
  },
  unlockCondition: {
    type: String,
    default: 'Complete all required skills'
  },
  dailyTimeLimit: {
    type: Number, // minutes
    default: 60
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

lockedAppSchema.virtual('isCurrentlyUnlocked').get(function () {
  if (!this.isLocked) return true;
  if (this.unlockedUntil && new Date() < this.unlockedUntil) return true;
  return false;
});

lockedAppSchema.index({ user: 1 });

const LockedApp = mongoose.model('LockedApp', lockedAppSchema);

export default LockedApp;