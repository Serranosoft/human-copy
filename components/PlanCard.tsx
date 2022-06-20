import { useEffect, useState } from 'react';
import s from '../styles/css/PlanCard.module.css';
import Button from './ui/Button';

interface Props {
    product: any;
    productPrice?: number;
    isLoading: boolean;
    priceIdLoading?: string;
    handleCheckout: any;
    buttonText: string;
    priceId: string;
    paymentType: string;
    wordsPerPrice: number
}

export default function PlanCard({ product, productPrice, isLoading, priceIdLoading, handleCheckout, buttonText, priceId, paymentType, wordsPerPrice }: Props) {

    const [price, setPrice] = useState<any>();
    console.log(product
    );

    useEffect(() => {
        if (productPrice) {
            if (product.prices!.length > 1) {
                setPrice(<span>{productPrice}€<span className={s.period}>/artículo</span></span>)
            } else {
                setPrice(<span>{product!.prices![0].unit_amount! / 100}€<span className={s.period}>/mes</span></span>)
            }
        }
    }, [productPrice])

    return (
        <div className={ `${s.root} ${product.prices!.length > 1 ? s.payment : s.subscription}`}>
            <span className={s.name}>{product.name == "Artículo único" ? `${product.name} de ${wordsPerPrice} palabras` : product.name}</span>
            <p className={s.description}>{product.description}</p>
            <p className={s.price}>{price}</p>
            <Button
                type="button"
                disabled={isLoading}
                loading={priceIdLoading === priceId}
                onClick={() => handleCheckout(price, paymentType)}
            >
                {buttonText}
            </Button>
        </div>

        
    )
}
