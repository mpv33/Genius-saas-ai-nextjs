import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-1xl">
          {isPro ?
            `Ensure your account is subscribed to the Pro plan, 
          granting you access to Unlimited AI Generations. Thank you for your cooperation.`
            : "You are currently on a free plan."
          }
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
      <div className="text-sm text-muted-foreground px-6 pt-12">
     <span className="text-red-500">* </span>
      Just Use an Indian Stripe test card India (IN) 4000003560000008 Visa
      </div>
    </div>
  );
}

export default SettingsPage;

