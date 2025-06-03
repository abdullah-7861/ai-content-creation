import { stripe } from '@/lib/stripe';
import { headers } from "next/headers"
import Stripe from "stripe"
import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';


export async function POST(req: Request){

    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch(error:any){
        return new NextResponse(`webhook Error: ${error.message}`, {status:400})
    }

    const session = event.data.object as Stripe.Checkout.Session

    if(event.type === "checkout.session.completed"){
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          ) as any;
          
        
          
          

        if(!session?.metadata?.userId){
            return new NextResponse("user Id Is required",{status:400})
        }
  {/*@ts-ignore */}
  await db.insert(UserSubscription).values({
  userId: session.metadata.userId,
  stripeSubscriptionId: subscription.id,
  stripeCustomerId: subscription.customer as string,
  stripePriceId: subscription.items.data[0].price.id,
  stripeCurrentPeriodEnd: subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000)
    : null,
});

    }

    if(event.type === "invoice.payment_succeeded"){
       const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          ) as any;
          {/*@ts-ignore */}
          await db.update(UserSubscription).set({stripePriceId: subscription.items.data[0].price.id,stripeCurrentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null, }).where(eq(UserSubscription.stripeSubscriptionId, subscription.id));


    }

    return new NextResponse(null, {status:200})
}