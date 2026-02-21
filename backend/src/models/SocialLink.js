import mongoose from 'mongoose';

const oauthSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
  expiresAt: Date,
  scopes: [String]
}, { _id: false });

const syncStatusSchema = new mongoose.Schema({ status: String, error: String }, { _id: false });

const visibilitySchema = new mongoose.Schema({ public: Boolean, showOnProfile: Boolean, order: Number }, { _id: false });

const engagementMetricsSchema = new mongoose.Schema({ likes: Number, comments: Number, shares: Number }, { _id: false });

const socialLinkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  platform: String,
  handle: String,
  displayName: String,
  url: String,
  iconUrl: String,
  profileUrl: String,
  username: String,
  connected: Boolean,
  connectionMethod: String,
  oauth: oauthSchema,
  verified: Boolean,
  followersCount: Number,
  followingCount: Number,
  postsCount: Number,
  lastSyncedAt: Date,
  syncStatus: syncStatusSchema,
  visibility: visibilitySchema,
  tags: [String],
  notes: String,
  metadata: { fetchedAt: Date, rawResponse: mongoose.Schema.Types.Mixed },
  audience: { demographics: mongoose.Schema.Types.Mixed },
  engagementMetrics: engagementMetricsSchema,
  badge: String,
  preferredForContact: Boolean,
  isPrimary: Boolean
}, { timestamps: true });

export default mongoose.model('SocialLink', socialLinkSchema);

