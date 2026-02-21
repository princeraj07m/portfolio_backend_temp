import mongoose from 'mongoose';

const metaTagSchema = new mongoose.Schema({ name: String, content: String }, { _id: false });
const analyticsSchema = new mongoose.Schema({ pageViews: Number, avgSessionDuration: Number, bounceRate: Number }, { _id: false });
const performanceSchema = new mongoose.Schema({ loadTime: Number, seoScore: Number, accessibilityScore: Number }, { _id: false });

const seoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  pageName: String,
  pageURL: String,
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  canonicalURL: String,
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  twitterCardType: String,
  twitterHandle: String,
  structuredData: String,
  sitemapPriority: Number,
  sitemapChangeFreq: String,
  robotsIndex: Boolean,
  robotsFollow: Boolean,
  hreflang: [String],
  schemaType: String,
  metaTags: [metaTagSchema],
  jsonLD: String,
  analytics: analyticsSchema,
  performance: performanceSchema,
  verifiedBy: String,
  verifiedAt: Date
}, { timestamps: true });

export default mongoose.model('SEO', seoSchema);

