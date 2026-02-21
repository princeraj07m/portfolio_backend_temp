import mongoose from 'mongoose';

const avatarVariantSchema = new mongoose.Schema({
  size: { type: String },
  url: { type: String }
}, { _id: false });

const websiteSchema = new mongoose.Schema({
  label: { type: String },
  url: { type: String },
  isPrimary: { type: Boolean, default: false }
}, { _id: false });

const coordsSchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number }
}, { _id: false });

const locationSchema = new mongoose.Schema({
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
  coords: { type: coordsSchema }
}, { _id: false });

const languageSchema = new mongoose.Schema({
  name: { type: String },
  proficiency: { type: String },
  proficiencyScore: { type: Number }
}, { _id: false });

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String },
  username: { type: String },
  url: { type: String },
  order: { type: Number },
  visible: { type: Boolean, default: true }
}, { _id: false });

const preferencesSchema = new mongoose.Schema({
  theme: { type: String },
  dateFormat: { type: String },
  locale: { type: String },
  units: { type: String }
}, { _id: false });

const metadataSchema = new mongoose.Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  lastLogin: { type: Date },
  signupSource: { type: String },
  signupMedium: { type: String }
}, { _id: false });

const twoFASchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false },
  method: { type: String },
  backupCodes: [{ type: String }]
}, { _id: false });

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String },
  ip: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date },
  lastSeen: { type: Date }
}, { _id: false });

const securitySchema = new mongoose.Schema({
  passwordLastChanged: { type: Date },
  twoFA: { type: twoFASchema },
  sessions: [sessionSchema]
}, { _id: false });

const privacySchema = new mongoose.Schema({
  showEmail: { type: Boolean, default: false },
  showPhone: { type: Boolean, default: false },
  showLocation: { type: Boolean, default: false },
  dataSharingOptIn: { type: Boolean, default: false }
}, { _id: false });

const notificationsSchema = new mongoose.Schema({
  email: {
    marketing: { type: Boolean, default: false },
    product: { type: Boolean, default: true },
    security: { type: Boolean, default: true }
  },
  sms: { alerts: { type: Boolean, default: false } },
  push: { enabled: { type: Boolean, default: false } }
}, { _id: false });

const rolesHistorySchema = new mongoose.Schema({
  role: { type: String },
  grantedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  grantedAt: { type: Date }
}, { _id: false });

const noteSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  roles: [{ type: String, default: 'editor' }],
  firstName: { type: String },
  lastName: { type: String },
  displayName: { type: String },
  preferredName: { type: String },
  profileImage: { type: String },
  coverImage: { type: String },
  avatarVariants: [avatarVariantSchema],
  tagline: { type: String },
  bioShort: { type: String },
  bioLong: { type: String },
  birthDate: { type: Date },
  gender: { type: String },
  location: { type: locationSchema },
  timezone: { type: String },
  phone: { type: String },
  alternatePhones: [{ type: String }],
  websites: [websiteSchema],
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  profilePublic: { type: Boolean, default: true },
  availableForHire: { type: Boolean, default: false },
  availabilityNotes: { type: String },
  freelanceRate: { value: { type: Number }, currency: { type: String }, unit: { type: String } },
  languages: [languageSchema],
  interests: [{ type: String }],
  hobbies: [{ type: String }],
  educationSummary: { type: String },
  experienceSummary: { type: String },
  skillSummary: { type: String },
  socialLinks: [socialLinkSchema],
  preferences: { type: preferencesSchema },
  metadata: { type: metadataSchema },
  security: { type: securitySchema },
  privacy: { type: privacySchema },
  notifications: { type: notificationsSchema },
  settingsOverrides: { type: mongoose.Schema.Types.Mixed },
  profileCompletePercent: { type: Number, default: 0 },
  rolesHistory: [rolesHistorySchema],
  notes: [noteSchema]
}, { timestamps: true });

export default mongoose.model('UserProfile', userProfileSchema);

