import mongoose from 'mongoose';

const cssVarSchema = new mongoose.Schema({ key: String, value: String }, { _id: false });
const metaSchema = new mongoose.Schema({ ipAddress: String, userAgent: String }, { _id: false });

const themeSettingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  themeName: String,
  primaryColor: String,
  secondaryColor: String,
  accentColor: String,
  textColor: String,
  backgroundColor: String,
  backgroundImage: String,
  gradient: String,
  fontFamily: String,
  fontSizeBase: String,
  headingStyle: String,
  paragraphStyle: String,
  buttonStyle: String,
  cardStyle: String,
  borderStyle: String,
  shadowStyle: String,
  darkModeEnabled: Boolean,
  animationsEnabled: Boolean,
  transitionDuration: String,
  hoverEffects: String,
  containerWidth: String,
  spacingScale: String,
  radiusScale: String,
  contrastMode: String,
  accentPattern: String,
  colorPalette: [String],
  cssVariables: [cssVarSchema],
  previewURL: String,
  version: String,
  appliedAt: Date,
  meta: metaSchema
}, { timestamps: true });

export default mongoose.model('ThemeSetting', themeSettingSchema);

