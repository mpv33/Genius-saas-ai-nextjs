import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import UserSubscription from "@/models/UserSubscription";
import connectDB from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    const body = await req.text();
  //  const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        process.env.STRIPE_WEBHOOK_SECRET!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      console.error("Webhook Error:", error.message);
      return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(session);
    }

    if (event.type === "invoice.payment_succeeded") {
      await handleInvoicePaymentSucceeded(session);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session?.metadata?.userId) {
    console.error("User id is required");
    throw new Error("User id is required");
  }

  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

  // Check if a document with the same stripeCustomerId already exists
  const existingSubscription = await UserSubscription.findOne({ stripeCustomerId: subscription.customer as string });

  if (existingSubscription) {
    // Update the existing document
    await UserSubscription.findOneAndUpdate(
      { stripeCustomerId: subscription.customer as string },
      {
        userId: session?.metadata?.userId,
        //firstName:session?.metadata?.firstName,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
      }
    );
  } else {
    // Insert a new document
    await UserSubscription.create({
      userId: session?.metadata?.userId,
      //firstName:session?.metadata?.firstName,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
    });
  }
}

async function handleInvoicePaymentSucceeded(session: Stripe.Checkout.Session) {
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

  // Check if a document with the same stripeSubscriptionId already exists
  const existingSubscription = await UserSubscription.findOne({ stripeSubscriptionId: subscription.id });

  if (existingSubscription) {
    // Update the existing document
    await UserSubscription.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      {
        userId: session?.metadata?.userId,
        // firstName:session?.metadata?.firstName,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    );
  } else {
    // Insert a new document
    await UserSubscription.create({
      userId: session?.metadata?.userId,
      //firstName:session?.metadata?.firstName,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  }
}
