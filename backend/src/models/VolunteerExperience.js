import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String }, { _id: false });
const metaCountsSchema = new mongoose.Schema({ viewsCount: Number, likesCount: Number, sharesCount: Number }, { _id: false });

const volunteerExperienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  organizationName: String,
  organizationLogo: String,
  title: String,
  cause: String,
  startDate: Date,
  endDate: Date,
  isOngoing: Boolean,
  roleType: String,
  responsibilities: [String],
  achievements: [String],
  projectRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  location: String,
  hoursContributed: Number,
  teamSize: Number,
  skillsGained: [String],
  certificateURL: String,
  impactScore: Number,
  feedbackRating: Number,
  supervisorName: String,
  supervisorContact: String,
  supervisorFeedback: String,
  highlights: [String],
  tags: [String],
  gallery: [String],
  reportURL: String,
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  verifiedAt: Date,
  visibility: String,
  order: Number,
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  seo: seoSchema,
  meta: metaCountsSchema,
  relatedVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VolunteerExperience' }]
}, { timestamps: true });

export default mongoose.model('VolunteerExperience', volunteerExperienceSchema);

