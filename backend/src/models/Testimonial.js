import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    avatar: { type: String },
    message: { type: String, required: true },
    company: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);

