import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String }, { _id: false });
const metaCountsSchema = new mongoose.Schema({ views: Number, clicks: Number }, { _id: false });

const blogTagSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  name: String,
  slug: { type: String, unique: true },
  description: String,
  color: String,
  icon: String,
  usageCount: Number,
  relatedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
  relatedCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory' }],
  seo: seoSchema,
  meta: metaCountsSchema
}, { timestamps: true });

export default mongoose.model('BlogTag', blogTagSchema);

