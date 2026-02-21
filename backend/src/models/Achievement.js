import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({ label: String, url: String }, { _id: false });
const endorserSchema = new mongoose.Schema({ name: String, role: String, comment: String }, { _id: false });
const impactMetricSchema = new mongoose.Schema({ metric: String, value: Number }, { _id: false });

const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  title: String,
  description: String,
  category: String,
  awardingOrganization: String,
  awardDate: Date,
  certificateUrl: String,
  badgeUrl: String,
  level: String,
  rank: String,
  relatedProject: mongoose.Schema.Types.ObjectId,
  relatedSkill: String,
  proofFiles: [fileSchema],
  publicNotes: String,
  internalNotes: String,
  visibility: String,
  tags: [String],
  location: String,
  judgesComments: String,
  score: Number,
  endorsers: [endorserSchema],
  impactMetrics: [impactMetricSchema],
  customFields: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.model('Achievement', achievementSchema);

