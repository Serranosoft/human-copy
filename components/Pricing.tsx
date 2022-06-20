import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from 'components/ui/Button';
import { postData } from 'utils/helpers';
import { getStripe } from 'utils/stripe-client';
import { useUser } from 'utils/useUser';
import { Price, ProductWithPrice } from 'types';
import s from '../styles/css/Pricing.module.css';
import Range from './ui/Range';

interface Props {
    products: ProductWithPrice[];
}

export default function Pricing({ products }: Props) {
    const router = useRouter();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const { user, isLoading, subscription } = useUser();
    const [range, applyRange] = useState(0);
    const [productPrice, applyProductPrice] = useState<number | undefined>(30);
    const [wordsPerPrice, setWordsPerPrice] = useState(3000);

    const handleCheckout = async (price: Price, mode: string) => {
        setPriceIdLoading(price.id);
        if (!user) {
            return router.push('/iniciar-sesion');
        }
        if (subscription) {
            return router.push('/account');
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

    useEffect(() => {
        if (productPrice) {
            switch(productPrice) {
                case 30:
                    setWordsPerPrice(3000);
                    break;
                case 45:
                    setWordsPerPrice(4000);
                    break;
                case 60:
                    setWordsPerPrice(5000);
                    break;
            }
        }
    }, [productPrice])

    function handleChange(e: any) {
        let product = products.find(product => product.prices!.length > 1);
        applyRange(e.target.value)
        applyProductPrice(product!.prices![e.target.value].unit_amount! / 100);
    }

    return (
        <section className={s.root}>
            {/* <input
                id="typeinp"
                type="range"
                min="0"
                max="2"
                value={range}
                onChange={handleChange}
                step="1"
            /> */}
            <Range 
                min="0"
                max="2"
                value={range}
                onChange={handleChange}
                step="1"
            />
            <span>{wordsPerPrice} palabras</span>
            {products.map((product) => {
                console.log(subscription);
                let id = product.prices!.length > 1 ? product.prices![range].id : product.prices![0].id;
                let price = product.prices!.length > 1 ? product.prices![range] : product.prices![0];
                let mode = product.prices!.length > 1 ? "payment" : "subscription";
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
                    <div>
                        <span>{product.name}</span>
                        <p>{product.description}</p>
                        <p>{product.prices!.length > 1 ? productPrice : product!.prices![0].unit_amount! / 100}</p>
                        <Button
                            type="button"
                            disabled={isLoading}
                            loading={priceIdLoading === id}
                            onClick={() => handleCheckout(price, mode)}
                            className=""
                        >
                            {buttonText}
                        </Button>
                    </div>
                )
            })}
        </section>
    )
}
