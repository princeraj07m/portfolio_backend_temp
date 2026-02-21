import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema({ ipAddress: String, lastActivity: Date }, { _id: false });

const collaborationSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  collaboratorId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  collaboratorName: String,
  role: String,
  responsibilities: [String],
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  permissionLevel: String,
  contributionPercentage: Number,
  commitsCount: Number,
  tasksCompleted: Number,
  performanceRating: Number,
  feedback: [String],
  linkedDocs: [String],
  githubURL: String,
  linkedinURL: String,
  avatarURL: String,
  paymentShare: Number,
  contractURL: String,
  status: String,
  joinedAt: Date,
  removedAt: Date,
  removedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  remarks: String,
  visibility: String,
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('Collaboration', collaborationSchema);

