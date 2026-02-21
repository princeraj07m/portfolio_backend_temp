import mongoose from 'mongoose';

const cookieConsentSchema = new mongoose.Schema({ enabled: Boolean, text: String, links: [String] }, { _id: false });
const gdprSchema = new mongoose.Schema({ dataRetentionDays: Number, consentRequired: Boolean }, { _id: false });
const navLinkSchema = new mongoose.Schema({ label: String, href: String, order: Number, visible: Boolean }, { _id: false });
const maintenanceModeSchema = new mongoose.Schema({ enabled: Boolean, message: String }, { _id: false });

const personalSettingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  siteTitle: String,
  siteTagline: String,
  faviconUrl: String,
  defaultLanguage: String,
  defaultLocale: String,
  dateFormat: String,
  timeFormat: String,
  currency: String,
  itemsPerPage: Number,
  maxUploadSizeBytes: Number,
  allowedFileTypes: [String],
  analyticsEnabled: Boolean,
  analyticsId: String,
  searchEngineIndexing: Boolean,
  sitemapEnabled: Boolean,
  robotsTxt: String,
  cookieConsent: cookieConsentSchema,
  gdprSettings: gdprSchema,
  customCSS: String,
  customJS: String,
  theme: String,
  themeOverrides: mongoose.Schema.Types.Mixed,
  layout: String,
  headerConfig: mongoose.Schema.Types.Mixed,
  footerConfig: mongoose.Schema.Types.Mixed,
  navLinks: [navLinkSchema],
  devMode: Boolean,
  maintenanceMode: maintenanceModeSchema,
  meta: { createdAt: Date, updatedAt: Date }
}, { timestamps: true });

export default mongoose.model('PersonalSetting', personalSettingSchema);

