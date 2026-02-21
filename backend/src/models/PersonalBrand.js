import mongoose from 'mongoose';

const logoVariantSchema = new mongoose.Schema({ size: String, url: String }, { _id: false });
const logoSchema = new mongoose.Schema({ url: String, svg: String, variants: [logoVariantSchema] }, { _id: false });

const colorsSchema = new mongoose.Schema({
  primary: String,
  secondary: String,
  accent: String,
  bg: String,
  text: String,
  palette: [String]
}, { _id: false });

const fontsVariantSchema = new mongoose.Schema({ name: String, url: String }, { _id: false });
const fontsSchema = new mongoose.Schema({ heading: String, body: String, monospace: String, variants: [fontsVariantSchema] }, { _id: false });

const iconSchema = new mongoose.Schema({ name: String, svg: String, url: String }, { _id: false });

const brandGuidelinesSchema = new mongoose.Schema({ fileUrl: String, summary: String, fullText: String }, { _id: false });

const voiceToneSchema = new mongoose.Schema({ tone: String, dos: [String], donts: [String] }, { _id: false });

const imageGuidelinesSchema = new mongoose.Schema({ aspectRatios: [String], filtersAllowed: [String], examples: [String] }, { _id: false });

const targetAudienceSchema = new mongoose.Schema({ demographics: String, psychographics: String }, { _id: false });

const usageRulesSchema = new mongoose.Schema({ logoMinSize: String, clearSpace: String, doNotUse: String }, { _id: false });

const assetSchema = new mongoose.Schema({ name: String, type: String, url: String, tags: [String] }, { _id: false });

const legalSchema = new mongoose.Schema({ trademarked: Boolean, trademarkId: String, copyrightHolder: String }, { _id: false });

const metaSchema = new mongoose.Schema({ createdAt: Date, updatedAt: Date, version: Number, published: Boolean }, { _id: false });

const visibilityRulesSchema = new mongoose.Schema({ publicSections: [String], privateSections: [String] }, { _id: false });

const a11ySchema = new mongoose.Schema({ contrastTargets: String, fontSizeMin: Number, keyboardNav: Boolean }, { _id: false });

const noteSchema = new mongoose.Schema({ authorId: mongoose.Schema.Types.ObjectId, text: String, createdAt: Date }, { _id: true });

const integrationSchema = new mongoose.Schema({ type: String, config: mongoose.Schema.Types.Mixed, lastSynced: Date }, { _id: false });

const previewUrlSchema = new mongoose.Schema({ device: String, url: String }, { _id: false });

const personalBrandSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  brandName: String,
  slogan: String,
  logo: logoSchema,
  colors: colorsSchema,
  fonts: fontsSchema,
  iconSet: [iconSchema],
  brandGuidelines: brandGuidelinesSchema,
  voiceTone: voiceToneSchema,
  imageGuidelines: imageGuidelinesSchema,
  keyMessages: [String],
  targetAudience: targetAudienceSchema,
  taglineVariants: [String],
  usageRules: usageRulesSchema,
  assets: [assetSchema],
  legal: legalSchema,
  meta: metaSchema,
  visibilityRules: visibilityRulesSchema,
  a11y: a11ySchema,
  notes: [noteSchema],
  integrations: [integrationSchema],
  previewUrls: [previewUrlSchema],
  brandScore: Number,
  archived: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('PersonalBrand', personalBrandSchema);

