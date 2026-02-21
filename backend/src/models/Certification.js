import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({ label: String, url: String }, { _id: false });

const certificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  title: String,
  issuingOrganization: String,
  issueDate: Date,
  expiryDate: Date,
  credentialId: String,
  credentialUrl: String,
  certificateFileUrl: String,
  score: Number,
  scoreMax: Number,
  verificationStatus: String,
  verificationMethod: String,
  verifiedByUrl: String,
  skillsCovered: [String],
  tags: [String],
  notes: String,
  attachments: [attachmentSchema],
  visible: Boolean,
  orderIndex: Number
}, { timestamps: true });

export default mongoose.model('Certification', certificationSchema);

