import { useState } from 'react';
import LoadingDots from 'components/ui/LoadingDots';
import Button from 'components/ui/Button';
import { useUser } from 'utils/useUser';
import { postData } from 'utils/helpers';
import s from '../styles/css/Cuenta.module.css';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import Head from 'next/head';

export const getServerSideProps = withAuthRequired({ redirectTo: '/iniciar-sesion' });

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
        <>
            <Head>
                <title>Cuenta</title>
                <meta content="La cuenta" name="description" />
            </Head>
            <section className={s.root}>
                <div>
                    {userDetails ?
                        <>
                            <h1>Datos de mi cuenta</h1>
                            <div className={s.info}>
                                <div>
                                    <p>Correo electrónico</p>
                                    <p>{userDetails!.email}</p>
                                </div>
                                <div>
                                    <p>Nombre</p>
                                    <p>{userDetails!.full_name}</p>
                                </div>
                                <div>
                                    <p>Plan contratado</p>
                                    <p>{userDetails!.plan !== -1 ? `${userDetails.plan} palabras restantes` : "Suscripción ilimitada"}</p>
                                </div>
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
                </div>
            </section>
        
        </>
    );
}