import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, canEdit: Boolean, canView: Boolean }, { _id: false });
const dimensionsSchema = new mongoose.Schema({ width: Number, height: Number }, { _id: false });
const metaSchema = new mongoose.Schema({ ipAddress: String, device: String, userAgent: String }, { _id: false });

const mediaAssetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  fileName: String,
  fileType: String,
  mimeType: String,
  fileSize: Number,
  fileURL: String,
  thumbnailURL: String,
  altText: String,
  title: String,
  caption: String,
  tags: [String],
  folderPath: String,
  relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  relatedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
  dimensions: dimensionsSchema,
  duration: Number,
  aspectRatio: String,
  uploadSource: String,
  uploadDate: Date,
  uploadedBy: String,
  visibility: String,
  accessLevel: String,
  permissions: [permissionSchema],
  compressionRatio: Number,
  checksum: String,
  storageProvider: String,
  isOptimized: Boolean,
  downloadCount: Number,
  viewsCount: Number,
  likesCount: Number,
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('MediaAsset', mediaAssetSchema);

