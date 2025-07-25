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
                email: user?.email || ''
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
                    phone_number_collection: {
                        enabled: true
                    },
                    mode: "payment",
                    allow_promotion_codes: true,
                    success_url: `${getURL()}/`,
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
                    phone_number_collection: {
                        enabled: true
                    },
                    mode: 'subscription',
                    allow_promotion_codes: true,
                    subscription_data: {
                        trial_from_plan: true,
                        metadata
                    },
                    success_url: `${getURL()}/`,
                    cancel_url: `${getURL()}/`
                });
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
