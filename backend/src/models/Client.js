import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({ city: String, state: String, country: String, postalCode: String }, { _id: false });
const paymentHistorySchema = new mongoose.Schema({ amount: Number, date: Date, method: String, transactionId: String }, { _id: false });
const metaSchema = new mongoose.Schema({ totalProjects: Number, totalSpent: Number, totalRevenue: Number }, { _id: false });

const clientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  name: String,
  companyName: String,
  companyLogo: String,
  email: String,
  phone: String,
  address: addressSchema,
  website: String,
  industry: String,
  linkedin: String,
  budget: Number,
  currency: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  requirements: [String],
  feedback: [String],
  rating: Number,
  contractURL: String,
  paymentStatus: String,
  paymentHistory: [paymentHistorySchema],
  notes: String,
  status: String,
  accountManager: String,
  joinedDate: Date,
  lastContactedAt: Date,
  nextFollowUpAt: Date,
  tags: [String],
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('Client', clientSchema);

