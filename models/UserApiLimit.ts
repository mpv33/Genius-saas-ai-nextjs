import mongoose from 'mongoose';

// Check if the model is already defined, and if so, delete it
if (mongoose.models.UserApiLimit) {
  delete mongoose.models.UserApiLimit;
}

const UserApiLimitSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  firstName: { type: String }, // Add field for first name
  count: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserApiLimit = mongoose.model('UserApiLimit', UserApiLimitSchema);

export default UserApiLimit;
