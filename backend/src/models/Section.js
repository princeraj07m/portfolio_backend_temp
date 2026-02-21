import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({ heading: String, subheading: String, paragraphs: [String], media: [String] }, { _id: false });
const metaSchema = new mongoose.Schema({ createdBy: mongoose.Schema.Types.ObjectId, updatedBy: mongoose.Schema.Types.ObjectId, lastEditedAt: Date }, { _id: false });

const sectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  name: String,
  slug: { type: String, unique: true },
  title: String,
  subtitle: String,
  icon: String,
  bgColor: String,
  textColor: String,
  layoutType: String,
  visibility: String,
  order: Number,
  isSticky: Boolean,
  animationStyle: String,
  content: contentSchema,
  linkedModel: String,
  itemCount: Number,
  customCSS: String,
  customJS: String,
  showInNav: Boolean,
  scrollTrigger: String,
  backgroundImage: String,
  backgroundVideo: String,
  opacity: Number,
  blurEffect: String,
  padding: String,
  margin: String,
  borderStyle: String,
  borderColor: String,
  borderRadius: String,
  shadow: String,
  transitions: String,
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('Section', sectionSchema);

