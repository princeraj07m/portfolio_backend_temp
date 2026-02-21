import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String
}, { _id: false });

const internshipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  title: String,
  company: String,
  companyUrl: String,
  location: String,
  mode: String, // onsite, remote, hybrid
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  mentor: String,
  description: String,
  responsibilities: [String],
  achievements: [String],
  technologies: [String],
  tools: [String],
  certificateUrl: String,
  outcome: String,
  tags: [String],
  attachments: [attachmentSchema],
  notes: String,
  visible: Boolean,
  orderIndex: Number
}, { timestamps: true });

export default mongoose.model('Internship', internshipSchema);


