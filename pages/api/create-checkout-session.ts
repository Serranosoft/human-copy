import { stripe } from 'utils/stripe';
import {
    getUser,
    withAuthRequired
} from '@supabase/supabase-auth-helpers/nextjs';
import { createOrRetrieveCustomer } from 'utils/supabase-admin';
import { getURL } from 'utils/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

const createCheckoutSession = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === 'POST') {
        const { price, quantity = 1, metadata = {}, mode } = req.body;
        try {
            const { user } = await getUser({ req, res });

            const customer = await createOrRetrieveCustomer({
                uuid: user?.id || '',
                email: user?.email || '',
                mode: mode,
                priceId: price.id
            });
            let session = null;
            if (mode == "payment") {
                session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    billing_address_collection: 'required',
                    customer,
                    line_items: [
                        {
                            price: price.id,
                            quantity
                        }
                    ],
                    mode: "payment",
                    allow_promotion_codes: true,
                    success_url: `${getURL()}/account`,
                    cancel_url: `${getURL()}/`
                });
            } else {
                session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    billing_address_collection: 'required',
                    customer,
                    line_items: [
                        {
                            price: price.id,
                            quantity
                        }
                    ],
                    mode: 'subscription',
                    allow_promotion_codes: true,
                    subscription_data: {
                        trial_from_plan: true,
                        metadata
                    },
                    success_url: `${getURL()}/account`,
                    cancel_url: `${getURL()}/`
                });

                if (customer) {
                    let words: number = 0;
                    switch(price.id) {
                        // 30€
                        case "price_1LCLYLCwSqNzkEvBBIUsRUXD":
                            console.log("AAA");
                            words = 3000
                            break;
                            // 45€
                            case "price_1LCLYLCwSqNzkEvBz83O5TL3":
                            console.log("bbb");
                            words = 4500
                            break;
                            // 60€
                            case "price_1LCMBFCwSqNzkEvBAV1TCtw2":
                            console.log("CCC");
                            words = 5500
                            break;                        
                    }
                }
            }

            return res.status(200).json({ sessionId: session.id });
        } catch (err: any) {
            console.log(err);
            res
                .status(500)
                .json({ error: { statusCode: 500, message: err.message } });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};

export default withAuthRequired(createCheckoutSession);
