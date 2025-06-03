import { metadata } from '@/app/layout';

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm';




const settingUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) {
      return new NextResponse("Unauthorized ", { status: 401 });
    }
    
      {/*@ts-ignore */}
    const userSub = await db.select().from(UserSubscription).where(eq(UserSubscription.userId, userId)).limit(1);
    if (userSub.length > 0 && userSub[0].stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSub[0].stripeCustomerId,
        return_url: settingUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
  {/*@ts-ignore */}
     const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types:["card"],
        mode:"subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items:[
             {
                price_data: {
                    currency:"USD",
                    product_data:{
                        name: "Genius Pro",
                        description: "Unlimited AI Generations", 
                    },
                    unit_amount: 200,
                    recurring:{
                        interval:"month"
                    }
                },
                quantity:1, 
             }
        ],
        metadata:{
            userId,
        },


     })

     return new NextResponse(JSON.stringify({url: stripeSession.url}))
  } catch (error) {
    console.log("[STRIPE ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
