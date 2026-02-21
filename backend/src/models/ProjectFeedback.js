import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema({ viewedByOwner: Boolean, followUpSent: Boolean }, { _id: false });

const projectFeedbackSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  name: String,
  email: String,
  role: String,
  rating: Number,
  comment: String,
  category: String,
  screenshotURL: String,
  suggestion: String,
  platform: String,
  browser: String,
  deviceType: String,
  location: String,
  ipAddress: String,
  tags: [String],
  isPublic: Boolean,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  status: String,
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  resolvedAt: Date,
  replyMessage: String,
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('ProjectFeedback', projectFeedbackSchema);

