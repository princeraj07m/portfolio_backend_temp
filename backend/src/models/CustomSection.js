import mongoose from 'mongoose';

const widgetSchema = new mongoose.Schema({ name: String, type: String, config: mongoose.Schema.Types.Mixed }, { _id: false });
const dataBindingSchema = new mongoose.Schema({ key: String, modelRef: String, path: String }, { _id: false });
const animationSchema = new mongoose.Schema({ name: String, duration: Number, delay: Number }, { _id: false });
const responsiveSchema = new mongoose.Schema({ mobile: String, tablet: String, desktop: String }, { _id: false });
const metaSchema = new mongoose.Schema({ createdBy: mongoose.Schema.Types.ObjectId, updatedBy: mongoose.Schema.Types.ObjectId, ipAddress: String }, { _id: false });
const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String }, { _id: false });

const customSectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  title: String,
  subtitle: String,
  slug: { type: String, unique: true },
  icon: String,
  bgColor: String,
  textColor: String,
  layout: String,
  visibility: String,
  order: Number,
  customHTML: String,
  customCSS: String,
  customJS: String,
  widgets: [widgetSchema],
  dataBindings: [dataBindingSchema],
  media: [String],
  animations: [animationSchema],
  responsiveSettings: responsiveSchema,
  showInNav: Boolean,
  navLabel: String,
  navIcon: String,
  meta: metaSchema,
  seo: seoSchema
}, { timestamps: true });

export default mongoose.model('CustomSection', customSectionSchema);

