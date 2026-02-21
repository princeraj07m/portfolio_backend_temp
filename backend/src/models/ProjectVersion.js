import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema({ sizeMB: Number, testedDevices: [String] }, { _id: false });

const projectVersionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  versionNumber: String,
  versionName: String,
  changelog: [String],
  description: String,
  releaseDate: Date,
  commitHash: String,
  branch: String,
  deployedURL: String,
  releaseType: String,
  author: String,
  testers: [String],
  bugFixes: [String],
  improvements: [String],
  newFeatures: [String],
  deprecatedFeatures: [String],
  versionFileURL: String,
  patchNotes: String,
  buildStatus: String,
  codeCoveragePercent: Number,
  buildNumber: String,
  environment: String,
  dependencies: [String],
  verifiedBy: String,
  approvedBy: String,
  downloadCount: Number,
  viewsCount: Number,
  feedbackRating: Number,
  feedbackMessages: [String],
  relatedVersion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectVersion' }],
  rollbackAvailable: Boolean,
  rollbackVersion: String,
  linkedDocs: [String],
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('ProjectVersion', projectVersionSchema);

