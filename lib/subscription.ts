import connectDB from "@/lib/mongodb";
import { auth } from "@clerk/nextjs";
import UserSubscription from "@/models/UserSubscription";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  
  await connectDB(); // Connect to MongoDB

  const { userId } = auth();
  if (!userId) {
    return false;
  }

  try {
    const userSubscription = await UserSubscription.findOne({ userId });

    if (!userSubscription) {
      return false;
    }

    const isValid = userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

    return isValid;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
};
