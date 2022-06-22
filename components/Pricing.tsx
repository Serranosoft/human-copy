import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from 'components/ui/Button';
import { postData } from 'utils/helpers';
import { getStripe } from 'utils/stripe-client';
import { useUser } from 'utils/useUser';
import { Price, ProductWithPrice } from 'types';
import s from '../styles/css/Pricing.module.css';
import Range from './ui/Range';
import PlanCard from './PlanCard';

interface Props {
    products: ProductWithPrice[];
}

export default function Pricing({ products }: Props) {
    const router = useRouter();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const { user, isLoading, subscription } = useUser();
    
    const handleCheckout = async (price: Price, mode: string) => {
        setPriceIdLoading(price.id);
        console.log(price);
        if (!user) {
            return router.push('/iniciar-sesion');
        }
        if (subscription) {
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
        <section className={s.root}>
            <h2>Plan de Precios</h2>
            <div className={s.planLayout}>
                {products.map((product) => {
                    /* let id = product.prices!.length > 1 ? product.prices![range].id : product.prices![0].id; */
                    let paymentType = product.prices!.length > 1 ? "payment" : "subscription";
                    let buttonText = "";
                    if (product.prices!.length > 1) {
                        buttonText = "Contratar"
                    } else {
                        if (product.name === subscription?.prices?.products?.name) {
                            buttonText = "Gestionar suscripción";
                        } else {
                            buttonText = "Suscribirse";
                        }
                    }
                    return (
                        <>
                            <PlanCard
                                product={product}
                                /* productPrice={productPrice} */
                                isLoading={isLoading}
                                priceIdLoading={priceIdLoading}
                                handleCheckout={handleCheckout}
                                buttonText={buttonText}
                                /* priceId={id} */
                                paymentType={paymentType}
                                /* wordsPerPrice={wordsPerPrice} */
                            />
                        </>
                    )
                })}
            </div>
            <div className={s.info}>
                <p>* Al ser escrito por personas y no por IA, los textos tardan en entregarse un tiempo variable dependiendo de la cantidad de palabras que solicites</p>
                <table>
                    <thead>
                        <tr>
                            <th>Palabras</th>
                            <th>Tiempo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1000</td>
                            <td>1 día</td>
                        </tr>
                        <tr>
                            <td>2000</td>
                            <td>1 día</td>
                        </tr>
                        <tr>
                            <td>3000</td>
                            <td>2 días</td>
                        </tr>
                        <tr>
                            <td>4000</td>
                            <td>2 - 3 días</td>
                        </tr>
                        <tr>
                            <td>5000</td>
                            <td>3 días</td>
                        </tr>
                        <tr>
                            <td>6000</td>
                            <td>4-5 días</td>
                        </tr>
                        <tr>
                            <td>+6000</td>
                            <td>+6 días</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}
