import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String }, { _id: false });
const analyticsSchema = new mongoose.Schema({ viewsCount: Number, sharesCount: Number }, { _id: false });
const customFieldSchema = new mongoose.Schema({ key: String, value: String }, { _id: false });

const projectCategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  name: String,
  slug: { type: String, unique: true },
  description: String,
  icon: String,
  bannerImage: String,
  colorTheme: String,
  visibility: String,
  order: Number,
  relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  projectCount: Number,
  avgRating: Number,
  avgViews: Number,
  seo: seoSchema,
  analytics: analyticsSchema,
  tags: [String],
  customFields: [customFieldSchema]
}, { timestamps: true });

export default mongoose.model('ProjectCategory', projectCategorySchema);

