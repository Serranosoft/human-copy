import { useRouter } from 'next/router';
import { useState } from 'react';
import { postData } from 'utils/helpers';
import { getStripe } from 'utils/stripe-client';
import { useUser } from 'utils/useUser';
import { Price, ProductWithPrice } from 'types';
import s from '../../styles/css/Pricing.module.css';
import PaymentPlanCard from './PaymentPlanCard';
import SubscriptionPlanCard from './SubscriptionPlanCard';
import FeatherSVG from '../icons/Feather';
// import CopywritingSVG from '../icons/Copywriting';

interface Props {
    products: ProductWithPrice[];
}

export default function Pricing({ products }: Props) {

    const router = useRouter();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const { user, isLoading, userDetails } = useUser();
    
    const handleCheckout = async (price: Price, mode: string) => {
        setPriceIdLoading(price.id);
        if (!user) {
            return router.push('/iniciar-sesion');
        }
        if (userDetails!.plan === -1) {
            alert("Ya tienes contratado la suscripción")
            return router.push('/');
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price, mode }
            });
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            return alert((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    return (
        <section id="pricingPanel" className={s.root}>
            <h2>Escoge un <span className="highlight-short">plan</span></h2>
            <p>Adquiere el plan ilimitado o una cantidad de palabras y solicita artículos. <span>Mínimo 500 palabras por artículo</span></p>
            <div className={s.planLayout}>

                <SubscriptionPlanCard
                    product={products[1]}
                    isLoading={isLoading}
                    handleCheckout={handleCheckout}
                    priceIdLoading={priceIdLoading}
                />

                <PaymentPlanCard 
                    product={products[0]}
                    isLoading={isLoading}
                    handleCheckout={handleCheckout}
                    priceIdLoading={priceIdLoading}
                />

            </div>
            <div className={s.paymentInfo}>
                <p>El pago se procesará a través de la pasarela de pagos de Stripe con tarjeta de crédito o débito</p>
                <p>Si necesitas pagar con otro método de pago mándanos un correo a <a href="mailto:humancopyes@gmail.com">humancopyes@gmail.com</a></p>
            </div>
            
            <div className={s.info}>
                <div>
                    <FeatherSVG />
                    <p>Al ser escrito por personas y no por IA, los textos tardan en entregarse un tiempo variable dependiendo de la cantidad de palabras que solicites</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Palabras</th>
                            <th>Tiempo aproximado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1000</td>
                            <td>2 días</td>
                        </tr>
                        <tr>
                            <td>2000</td>
                            <td>3 días</td>
                        </tr>
                        <tr>
                            <td>3000</td>
                            <td>4 días</td>
                        </tr>
                        <tr>
                            <td>4000</td>
                            <td>5 días</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={s.copyInfo}>
                <p>Si decide incluir copywriting en algún momento, debe tener en cuenta que los tiempos de entrega serán mayores.</p>
            </div>
            
        </section>
    )
}
