import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({ phase: String, duration: String, deliverables: String }, { _id: false });
const milestoneSchema = new mongoose.Schema({ name: String, dueDate: Date, payment: Number }, { _id: false });
const revisionSchema = new mongoose.Schema({ version: String, changeSummary: String, date: Date }, { _id: false });
const metaSchema = new mongoose.Schema({ ipAddress: String, userAgent: String }, { _id: false });

const proposalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  title: String,
  proposalCode: String,
  description: String,
  summary: String,
  problemStatement: String,
  proposedSolution: String,
  timeline: [timelineSchema],
  milestones: [milestoneSchema],
  estimatedBudget: Number,
  currency: String,
  paymentTerms: String,
  deliverables: [String],
  techStack: [String],
  teamMembers: [String],
  status: String,
  sentAt: Date,
  acceptedAt: Date,
  rejectedAt: Date,
  revisionHistory: [revisionSchema],
  pdfURL: String,
  signatureURL: String,
  clientFeedback: String,
  approvalComments: String,
  projectRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  remarks: String,
  tags: [String],
  viewedCount: Number,
  lastViewedAt: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('Proposal', proposalSchema);

