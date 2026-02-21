import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({ city: String, state: String, country: String, remote: Boolean }, { _id: false });
const managerSchema = new mongoose.Schema({ name: String, email: String, profileUrl: String }, { _id: false });
const impactMetricSchema = new mongoose.Schema({ metric: String, value: Number, unit: String, explanation: String }, { _id: false });
const projectRefSchema = new mongoose.Schema({ projectId: mongoose.Schema.Types.ObjectId, role: String, contribution: String }, { _id: false });
const salarySchema = new mongoose.Schema({ amount: Number, currency: String, frequency: String }, { _id: false });
const endorsementSchema = new mongoose.Schema({ from: String, text: String, rating: Number, date: Date }, { _id: false });
const referenceContactSchema = new mongoose.Schema({ name: String, email: String, phone: String, relation: String }, { _id: false });

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  title: String,
  company: String,
  companyUrl: String,
  companyLogo: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  location: locationSchema,
  employmentType: String,
  department: String,
  teamSize: Number,
  manager: managerSchema,
  responsibilities: [String],
  achievements: [String],
  impactMetrics: [impactMetricSchema],
  technologies: [String],
  projects: [projectRefSchema],
  salary: salarySchema,
  benefits: [String],
  attachments: [{ label: String, url: String, type: String }],
  endorsements: [endorsementSchema],
  visibility: String,
  tags: [String],
  slug: String,
  notes: String,
  durationInMonths: Number,
  orderIndex: Number,
  referenceContact: referenceContactSchema
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);

