import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import UserSubscription from "@/models/UserSubscription";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    // Ensure user is authenticated and retrieve user info
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized stripe", { status: 401 });
    }

    // Find user subscription by user ID
    const userSubscription = await UserSubscription.findOne({ userId });

    let stripeSession;

    if (userSubscription && userSubscription.stripeCustomerId) {
      // Redirect to Stripe Billing Portal for existing customers
      stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

    } else {
      // Create new subscription session for new customers
      stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Genius  Pro",
                description: "Unlimited AI Generations"
              },
              unit_amount: 1000, // Amount in cents (USD 20.00)
              recurring: {
                interval: "month"
              }
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
         firstName: user?.firstName || ''
        },
      });
    }
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
