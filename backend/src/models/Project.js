import mongoose from 'mongoose';

const metricsSchema = new mongoose.Schema({
  linesOfCode: Number,
  commits: Number,
  contributors: Number,
  testsPassed: Number,
  coveragePercent: Number
}, { _id: false });

const contributorSchema = new mongoose.Schema({
  name: String,
  role: String,
  github: String,
  avatarURL: String
}, { _id: false });

const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String }, { _id: false });
const analyticsSchema = new mongoose.Schema({ visits: Number, conversions: Number, avgTimeSpent: Number }, { _id: false });

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: String,
  longDescription: String,
  problemStatement: String,
  solutionSummary: String,
  architectureOverview: String,
  bannerImage: String,
  thumbnail: String,
  gallery: [String],
  repoURL: String,
  liveDemoURL: String,
  videoDemoURL: String,
  technologies: [String],
  tools: [String],
  frameworks: [String],
  libraries: [String],
  type: String,
  category: String,
  tags: [String],
  projectGoal: String,
  features: [String],
  challenges: [String],
  outcomes: [String],
  metrics: metricsSchema,
  contributors: [contributorSchema],
  client: String,
  clientFeedback: String,
  budget: Number,
  duration: String,
  startDate: Date,
  endDate: Date,
  isOngoing: Boolean,
  isFeatured: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: true },
  priority: Number,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  rating: Number,
  feedback: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId }],
  relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  seo: seoSchema,
  analytics: analyticsSchema
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);

