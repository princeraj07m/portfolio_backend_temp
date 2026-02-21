import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema({ editedBy: mongoose.Schema.Types.ObjectId, editedAt: Date }, { _id: false });

const blogCommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  name: String,
  email: String,
  avatarURL: String,
  commentText: String,
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogComment' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogComment' }],
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },
  status: String,
  ipAddress: String,
  userAgent: String,
  location: String,
  isPinned: Boolean,
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('BlogComment', blogCommentSchema);

