import Link from 'next/link';
import { useState, ReactNode } from 'react';

import LoadingDots from 'components/ui/LoadingDots';
import Button from 'components/ui/Button';
import { useUser } from 'utils/useUser';
import { postData } from 'utils/helpers';

import { withAuthRequired, User } from '@supabase/supabase-auth-helpers/nextjs';

interface Props {
    title: string;
    description?: string;
    footer?: ReactNode;
    children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
    return (
        <div>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                {children}
            </div>
            <div>{footer}</div>
        </div>
    );
}

export const getServerSideProps = withAuthRequired({ redirectTo: '/signin' });

export default function Account({ user }: { user: User }) {
    const [loading, setLoading] = useState(false);
    const { isLoading, subscription, userDetails } = useUser();

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if (error) return alert((error as Error).message);
        }
        setLoading(false);
    };

    const subscriptionPrice =
        subscription &&
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: subscription?.prices?.currency,
            minimumFractionDigits: 0
        }).format((subscription?.prices?.unit_amount || 0) / 100);

    return (
        <section>
            <div>
                <div>
                    <h1>
                        Cuenta
                    </h1>
                    <p>
                        We partnered with Stripe for a simplified billing.
                    </p>
                </div>
            </div>
            <div>
                <Card
                    title="Your Plan"
                    description={
                        subscription
                            ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
                            : ''
                    }
                    footer={
                        <div>
                            <p>
                                Manage your subscription on Stripe.
                            </p>
                            <Button
                                loading={loading}
                                disabled={loading || !subscription}
                                onClick={redirectToCustomerPortal}
                            >
                                Open customer portal
                            </Button>
                        </div>
                    }
                >
                    <div>
                        {isLoading ? (
                            <div>
                                <LoadingDots />
                            </div>
                        ) : subscription ? (
                            `${subscriptionPrice}/${subscription?.prices?.interval}`
                        ) : (
                            <Link href="/">
                                <a>Choose your plan</a>
                            </Link>
                        )}
                    </div>
                </Card>
                <Card
                    title="Your Name"
                    description="Please enter your full name, or a display name you are comfortable with."
                    footer={<p>Please use 64 characters at maximum.</p>}
                >
                    <div>
                        {userDetails ? (`${userDetails?.full_name}`) :
                            (
                                <div>
                                    <LoadingDots />
                                </div>
                            )}
                    </div>
                </Card>
                <Card
                    title="Your Email"
                    description="Please enter the email address you want to use to login."
                    footer={<p>We will email you to verify the change.</p>}
                >
                    <p>
                        {user ? user.email : undefined}
                    </p>
                </Card>
            </div>
        </section>
    );
}
