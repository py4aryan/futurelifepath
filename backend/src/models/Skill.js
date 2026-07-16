import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a skill title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  type: {
    type: String,
    enum: ['habit', 'main', 'challenge', 'custom'],
    default: 'main'
  },
  duration: {
    type: String,
    default: '15 min'
  },
  xp: {
    type: Number,
    required: true,
    min: [0, 'XP cannot be negative'],
    default: 50
  },
  optional: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  scheduledFor: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['productivity', 'health', 'learning', 'social', 'creative', 'other'],
    default: 'other'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  icon: {
    type: String,
    default: '⭐'
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  recurring: {
    enabled: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily'
    },
    days: {
      type: [Number], 
      default: []
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


skillSchema.index({ user: 1, scheduledFor: -1 });
skillSchema.index({ user: 1, completed: 1 });


skillSchema.methods.markComplete = async function() {
  this.completed = true;
  this.completedAt = new Date();
  await this.save();
  return this;
};

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;