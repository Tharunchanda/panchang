import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const LocationSchema = new Schema({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number], default: [0, 0] } // [lon, lat]
});

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, // hashed
    role: { type: String, enum: ['user', 'astrologer', 'admin'], default: 'user' },

    // profile / astrology fields
    dob: { type: Date },
    tob: { type: String },        // time of birth (optional)
    pob: { type: String },        // place of birth (string)
    location: { type: LocationSchema }, // geo search (lon, lat)

    // astrologer-only fields
    specialties: { type: [String], default: [] },
    experienceYears: { type: Number, default: 0 },
    feesPerSession: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    availability: { type: Array, default: [] }, // [{day:'Mon', from:'10:00', to:'14:00'}]
    verified: { type: Boolean, default: false },

    // admin / meta
    isActive: { type: Boolean, default: true },
    bio: String,
    profilePicUrl: String,

    // 🚀 NEW FIELDS for role request workflow
    requestedRole: { type: String, enum: ['astrologer'], default: null },
    requestStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: null }
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Indexes
UserSchema.index({ location: '2dsphere' });
UserSchema.index({ name: 'text', specialties: 'text', bio: 'text' });

const User = mongoose.model('User', UserSchema);
export default User;
