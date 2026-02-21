import mongoose from 'mongoose';

const phoneSchema = new mongoose.Schema({ label: String, number: String, verified: Boolean, preferred: Boolean }, { _id: false });
const messengerSchema = new mongoose.Schema({ platform: String, handle: String, url: String, linked: Boolean }, { _id: false });
const coordsSchema = new mongoose.Schema({ lat: Number, lng: Number }, { _id: false });
const addressSchema = new mongoose.Schema({ label: String, street: String, city: String, state: String, country: String, postalCode: String, coords: coordsSchema, isPrimary: Boolean }, { _id: false });
const contactHoursSchema = new mongoose.Schema({ weekdays: String, weekends: String, timezone: String }, { _id: false });
const contactFormFieldSchema = new mongoose.Schema({ name: String, type: String, required: Boolean, placeholder: String, order: Number }, { _id: false });
const autoResponderSchema = new mongoose.Schema({ enabled: Boolean, message: String, delayHours: Number }, { _id: false });
const spamProtectionSchema = new mongoose.Schema({ recaptcha: Boolean, honeypot: Boolean, rateLimitPerHour: Number }, { _id: false });
const responseSLASchema = new mongoose.Schema({ type: String, expectedHours: Number }, { _id: false });
const crmIntegrationSchema = new mongoose.Schema({ provider: String, config: mongoose.Schema.Types.Mixed, lastSynced: Date }, { _id: false });
const visibilitySchema = new mongoose.Schema({ showOnSite: Boolean, showEmail: Boolean, showPhone: Boolean }, { _id: false });

const contactInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  primaryEmail: String,
  secondaryEmails: [String],
  phones: [phoneSchema],
  messengerHandles: [messengerSchema],
  physicalAddresses: [addressSchema],
  contactHours: contactHoursSchema,
  preferredContactMethod: String,
  contactFormEnabled: Boolean,
  contactFormFields: [contactFormFieldSchema],
  autoResponder: autoResponderSchema,
  spamProtection: spamProtectionSchema,
  responseSLAs: responseSLASchema,
  crmIntegration: crmIntegrationSchema,
  notes: String,
  visibility: visibilitySchema,
  meta: { createdAt: Date, updatedAt: Date }
}, { timestamps: true });

export default mongoose.model('ContactInfo', contactInfoSchema);

