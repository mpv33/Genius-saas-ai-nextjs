const mongoose = require('mongoose');
const { Schema } = mongoose;

if (mongoose.models.UserSubscription) {
  delete mongoose.models.UserSubscription;
}

const UserSubscriptionSchema = new Schema({
  userId: { type: String, unique: true },
  firstName: { type: String }, // Add field for first name
  stripeCustomerId: { type: String, unique: true },
  stripeSubscriptionId: { type: String, unique: true },
  stripePriceId: String,
  stripeCurrentPeriodEnd: Date
});

const UserSubscription = mongoose.model('UserSubscription', UserSubscriptionSchema);

export default UserSubscription;
