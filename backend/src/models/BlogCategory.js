import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String }, { _id: false });
const analyticsSchema = new mongoose.Schema({ viewsCount: Number, sharesCount: Number }, { _id: false });
const customFieldSchema = new mongoose.Schema({ key: String, value: String }, { _id: false });

const blogCategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  name: String,
  slug: { type: String, unique: true },
  description: String,
  icon: String,
  coverImage: String,
  bannerImage: String,
  colorTheme: String,
  visibility: String,
  order: Number,
  relatedTags: [String],
  postCount: Number,
  averageViews: Number,
  averageLikes: Number,
  isFeatured: Boolean,
  seo: seoSchema,
  analytics: analyticsSchema,
  customFields: [customFieldSchema]
}, { timestamps: true });

export default mongoose.model('BlogCategory', blogCategorySchema);

