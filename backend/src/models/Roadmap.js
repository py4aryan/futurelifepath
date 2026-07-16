import mongoose from 'mongoose';

// ── Stage sub-document ──────────────────────────────────────────────────────
const stageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Stage title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  xp: {
    type: Number,
    default: 100,
    min: 0
  },
  category: {
    type: String,
    enum: ['skills', 'habits', 'academics', 'mindset', 'career', 'health', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['locked', 'current', 'completed'],
    default: 'locked'
  },
  reward: {
    type: String,
    default: ''
  },
  completedAt: {
    type: Date
  },
  order: {
    type: Number,
    default: 0
  }
});

const roadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a roadmap title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
    default: ''
  },
  category: {
    type: String,
    enum: ['career', 'education', 'health', 'personal', 'financial', 'other'],
    default: 'other'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  stages: [stageSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  targetDate: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

roadmapSchema.virtual('progressPercent').get(function () {
  if (!this.stages || this.stages.length === 0) return 0;
  const completed = this.stages.filter(s => s.status === 'completed').length;
  return Math.round((completed / this.stages.length) * 100);
});

roadmapSchema.virtual('earnedXP').get(function () {
  if (!this.stages) return 0;
  return this.stages
    .filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + s.xp, 0);
});

roadmapSchema.index({ user: 1, isActive: 1 });

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;