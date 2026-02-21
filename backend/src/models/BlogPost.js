import mongoose from 'mongoose';

const revisionSchema = new mongoose.Schema({ version: String, date: Date, summary: String }, { _id: false });
const reactionSchema = new mongoose.Schema({ emoji: String, count: Number }, { _id: false });
const metaSchema = new mongoose.Schema({ createdBy: mongoose.Schema.Types.ObjectId, updatedBy: mongoose.Schema.Types.ObjectId, ipAddress: String, userAgent: String }, { _id: false });
const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String, ogImage: String, canonicalURL: String, twitterCardType: String }, { _id: false });
const analyticsSchema = new mongoose.Schema({ avgTimeOnPage: Number, scrollDepthPercent: Number, exitRate: Number, bounceRate: Number }, { _id: false });

const blogPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  title: String,
  slug: { type: String, unique: true },
  summary: String,
  content: String,
  markdownContent: String,
  htmlContent: String,
  coverImage: String,
  bannerImage: String,
  authorName: String,
  authorAvatar: String,
  coAuthors: [String],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory' },
  tags: [String],
  readTime: Number,
  language: String,
  status: String,
  scheduledPublishDate: Date,
  publishedAt: Date,
  editedAt: Date,
  editorVersion: String,
  revisions: [revisionSchema],
  viewsCount: { type: Number, default: 0 },
  likesCount: { type: Number, default: 0 },
  sharesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  bookmarksCount: { type: Number, default: 0 },
  reactions: [reactionSchema],
  isFeatured: Boolean,
  visibility: String,
  order: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogComment' }],
  relatedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
  relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  meta: metaSchema,
  seo: seoSchema,
  analytics: analyticsSchema
}, { timestamps: true });

export default mongoose.model('BlogPost', blogPostSchema);

