import connectDB from "@/lib/mongodb"; // Assuming you have a MongoDB connection file
import { auth, currentUser } from "@clerk/nextjs";
import { MAX_FREE_COUNTS } from "@/constants";
import UserApiLimit from "@/models/UserApiLimit";

// Connect to MongoDB
connectDB();

export const incrementApiLimit = async () => {
  const { userId } = auth();
  const user = await currentUser(); // Get current user

  if (!userId) {
    return;
  }

  try {
 

    let userApiLimit = await UserApiLimit.findOne({ userId });

    if (user) { // Add null check for user
      if (userApiLimit) {
        userApiLimit.count += 1;
      } else {
        userApiLimit = new UserApiLimit({
           userId, count: 1,
           firstName:user?.firstName || ''
          }); // Include user's first name
      }

      await userApiLimit.save();
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  try {
    const userApiLimit = await UserApiLimit.findOne({ userId });

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  try {
    const userApiLimit = await UserApiLimit.findOne({ userId });

    if (!userApiLimit) {
      return 0;
    }

    return userApiLimit.count;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
