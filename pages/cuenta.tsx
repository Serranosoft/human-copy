import { useState, ReactNode } from 'react';
import LoadingDots from 'components/ui/LoadingDots';
import Button from 'components/ui/Button';
import { useUser } from 'utils/useUser';
import { postData } from 'utils/helpers';
import s from '../styles/css/Cuenta.module.css';

import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';

interface Props {
    title: string;
    description?: string;
    footer?: ReactNode;
    children: ReactNode;
}

export const getServerSideProps = withAuthRequired({ redirectTo: '/signin' });

export default function Account() {
    const [loading, setLoading] = useState(false);
    const { userDetails } = useUser();

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


    return (
        <section className={s.root}>
            <h1>Mi cuenta</h1>
            {userDetails ?
                <>
                    <div className={s.info}>
                        <p>Datos de mi cuenta</p>
                        <p>Correo electrónico: {userDetails!.email}</p>
                        <p>Nombre: {userDetails!.full_name}</p>
                        <p>Plan contratado: {userDetails!.plan !== -1 ? userDetails.plan : "Suscripción ilimitada"}</p>
                    </div>
                    <div className={s.stripe}>
                        <p>
                            Ver datos de tu suscripción en HumanCopy desde <i>Stripe</i>.
                        </p>
                        <Button
                            loading={loading}
                            disabled={loading || userDetails.plan !== -1}
                            onClick={redirectToCustomerPortal}
                        >
                        Abrir portal de cliente
                        </Button>
                    </div>
                </>
                :
                <LoadingDots />
                
            }
        </section>
    );
}