import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String
}, { _id: false });

const hackathonSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  name: String,
  organizer: String,
  startDate: Date,
  endDate: Date,
  location: String,
  online: Boolean,
  role: String, // participant, mentor, judge
  teamName: String,
  teammates: [String],
  projectTitle: String,
  projectSummary: String,
  projectRepoUrl: String,
  projectDemoUrl: String,
  award: String,
  rank: Number,
  prize: String,
  score: Number,
  technologies: [String],
  tools: [String],
  responsibilities: [String],
  links: [String],
  certificateUrl: String,
  tags: [String],
  attachments: [attachmentSchema],
  notes: String,
  visible: Boolean,
  orderIndex: Number
}, { timestamps: true });

export default mongoose.model('Hackathon', hackathonSchema);


