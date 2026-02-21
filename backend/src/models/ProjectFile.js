import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, canEdit: Boolean, canView: Boolean }, { _id: false });
const metaSchema = new mongoose.Schema({ ipAddress: String, device: String, userAgent: String }, { _id: false });

const projectFileSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  fileName: String,
  fileType: String,
  fileSize: Number,
  fileURL: String,
  uploadDate: Date,
  version: String,
  fileCategory: String,
  description: String,
  uploadedBy: String,
  visibility: String,
  permissions: [permissionSchema],
  checksum: String,
  tags: [String],
  relatedVersion: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectVersion' },
  linkedDocs: [String],
  downloadCount: Number,
  previewAvailable: Boolean,
  previewURL: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId }],
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('ProjectFile', projectFileSchema);

