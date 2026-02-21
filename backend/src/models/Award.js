import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema({ device: String, ipAddress: String, userAgent: String }, { _id: false });
const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String }, { _id: false });

const awardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  title: String,
  organization: String,
  category: String,
  subcategory: String,
  dateReceived: Date,
  awardLevel: String,
  description: String,
  imageURL: String,
  certificateURL: String,
  awardLogo: String,
  issuedBy: String,
  judgeName: String,
  criteria: String,
  nominationDetails: String,
  awardType: String,
  location: String,
  tags: [String],
  relevanceScore: Number,
  projectRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  isFeatured: Boolean,
  visibility: String,
  positionRank: String,
  grade: String,
  points: Number,
  recognitionURL: String,
  relatedMedia: [String],
  notes: String,
  internalCode: String,
  reviewerComment: String,
  shareableLink: String,
  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  downloadsCount: { type: Number, default: 0 },
  sharesCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId }],
  commentsCount: { type: Number, default: 0 },
  feedbackRating: Number,
  feedbackMessages: [String],
  relatedAchievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  verifiedAt: Date,
  lastAccessedAt: Date,
  meta: metaSchema,
  seo: seoSchema
}, { timestamps: true });

export default mongoose.model('Award', awardSchema);

