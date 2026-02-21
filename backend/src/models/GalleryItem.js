import mongoose from 'mongoose';

const cameraSettingsSchema = new mongoose.Schema({ aperture: String, iso: String, shutterSpeed: String, focalLength: String }, { _id: false });
const seoSchema = new mongoose.Schema({ metaTitle: String, metaDescription: String, keywords: String }, { _id: false });

const galleryItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  title: String,
  description: String,
  imageURL: String,
  thumbnailURL: String,
  tags: [String],
  category: String,
  subcategory: String,
  order: Number,
  visibility: String,
  galleryType: String,
  relatedProject: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
  relatedEvent: { type: mongoose.Schema.Types.ObjectId },
  colorPalette: [String],
  location: String,
  cameraSettings: cameraSettingsSchema,
  photographer: String,
  copyrightInfo: String,
  licenseType: String,
  uploadedBy: String,
  uploadDate: Date,
  viewsCount: Number,
  likesCount: Number,
  sharesCount: Number,
  downloadCount: Number,
  rating: Number,
  feedback: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId }],
  seo: seoSchema
}, { timestamps: true });

export default mongoose.model('GalleryItem', galleryItemSchema);

