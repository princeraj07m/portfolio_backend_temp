import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: 'Admin' },
    role: { type: String, enum: ['admin'], default: 'admin' }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);

