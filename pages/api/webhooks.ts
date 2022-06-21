import { stripe } from 'utils/stripe';
import {
    upsertProductRecord,
    upsertPriceRecord,
    manageSubscriptionStatusChange
} from 'utils/supabase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Readable } from 'node:stream';
import { supabase } from '@/utils/supabase-client';

// Stripe requires the raw body to construct the event.
export const config = {
    api: {
        bodyParser: false
    }
};

async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
]);

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];
        const webhookSecret =
            process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
            process.env.STRIPE_WEBHOOK_SECRET;
        let event: Stripe.Event;

        try {
            if (!sig || !webhookSecret) return;
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err: any) {
            console.log(`❌ Error message: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        console.log("No entiendo de vd");
        if (relevantEvents.has(event.type)) {
            console.log(event.type);

            try {
                switch (event.type) {
                    case 'product.created':
                    case 'product.updated':
                        await upsertProductRecord(event.data.object as Stripe.Product);
                        break;
                    case 'price.created':
                    case 'price.updated':
                        await upsertPriceRecord(event.data.object as Stripe.Price);
                        break;
                    case 'customer.subscription.created':
                    case 'customer.subscription.updated':
                    case 'customer.subscription.deleted':
                        const subscription = event.data.object as Stripe.Subscription;
                        await manageSubscriptionStatusChange(
                            subscription.id,
                            subscription.customer as string,
                            event.type === 'customer.subscription.created'
                        );
                        break;
                    case 'checkout.session.completed':
                        const checkoutSession = event.data
                            .object as Stripe.Checkout.Session;
                        let plan = "";
                        switch (checkoutSession.amount_total! / 100) {
                            case 30:
                                plan = "3000"
                                break;
                            case 45:
                                plan = "4000"
                                break;
                            case 60:
                                plan = "5000"
                                break;
                        }
                        if (checkoutSession.mode === 'subscription') {
                            const subscriptionId = checkoutSession.subscription;
                            await manageSubscriptionStatusChange(
                                subscriptionId as string,
                                checkoutSession.customer as string,
                                true
                            );
                            await supabase.from('users').update({suscrito: true}).match({ email: checkoutSession.customer_details!.email });
                            await supabase.from('users').update({plan: "ilimitado"}).match({ email: checkoutSession.customer_details!.email });
                        } else {
                            // Sumar el plan que va a comprar al que ya tiene (si ya tiene alguno, claro)
                            const { data, error } = await supabase
                                .from("users")
                                .select("plan").eq("email", checkoutSession.customer_details!.email);
                            // @ts-ignore
                            let currentPlan = data !== null ? parseInt(data.plan) : 0;
                            let resultPlan = parseInt(plan) + currentPlan;
                            await supabase.from('users').update({plan: resultPlan}).match({ email: checkoutSession.customer_details!.email });
                        }
                        break;
                    default:
                        throw new Error('Unhandled relevant event!');
                }
            } catch (error) {
                console.log(error);
                return res
                    .status(400)
                    .send('Webhook error: "Webhook handler failed. View logs."');
            }
        }

        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};

export default webhookHandler;
