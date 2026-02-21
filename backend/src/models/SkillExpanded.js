import mongoose from 'mongoose';

const endorsementSchema = new mongoose.Schema({ from: String, text: String, date: Date }, { _id: false });
const learningResourceSchema = new mongoose.Schema({ title: String, url: String, type: String, notes: String }, { _id: false });
const exampleSchema = new mongoose.Schema({ title: String, url: String, description: String }, { _id: false });

const skillExpandedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  name: String,
  category: String,
  subCategory: String,
  proficiencyLevel: String,
  proficiencyPercent: Number,
  yearsExperience: Number,
  firstUsed: Date,
  lastUsed: Date,
  endorsements: [endorsementSchema],
  relatedSkills: [String],
  competencyFramework: [String],
  certificationIds: [mongoose.Schema.Types.ObjectId],
  projects: [mongoose.Schema.Types.ObjectId],
  useCases: [String],
  learningResources: [learningResourceSchema],
  examples: [exampleSchema],
  rank: Number,
  tags: [String],
  visible: Boolean,
  notes: String,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.model('SkillExpanded', skillExpandedSchema);

