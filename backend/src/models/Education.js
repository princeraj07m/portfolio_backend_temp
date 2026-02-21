import mongoose from 'mongoose';

const thesisSchema = new mongoose.Schema({ title: String, url: String, abstract: String }, { _id: false });
const locationSchema = new mongoose.Schema({ city: String, country: String }, { _id: false });
const projectSchema = new mongoose.Schema({ title: String, description: String, url: String }, { _id: false });
const attachmentSchema = new mongoose.Schema({ name: String, url: String }, { _id: false });

const educationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  institution: String,
  institutionUrl: String,
  institutionLogo: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  grade: String,
  gpa: Number,
  gpaScale: Number,
  honors: String,
  courses: [String],
  thesis: thesisSchema,
  extracurriculars: [String],
  location: locationSchema,
  certifications: [String],
  projects: [projectSchema],
  achievements: [String],
  attachments: [attachmentSchema],
  visibleOnProfile: Boolean,
  orderIndex: Number,
  notes: String
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);

