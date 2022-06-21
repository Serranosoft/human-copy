import { useEffect, useState } from 'react';
import s from '../styles/css/PlanCard.module.css';
import Button from './ui/Button';
import Range from './ui/Range';

interface Props {
    product: any;
    /* productPrice?: number; */
    isLoading: boolean;
    priceIdLoading?: string;
    handleCheckout: any;
    buttonText: string;
    /* priceId: string; */
    paymentType: string;
    /* wordsPerPrice: number */
}

export default function PlanCard({ product, /* productPrice,  */isLoading, priceIdLoading, handleCheckout, buttonText, /* priceId, */ paymentType, /* wordsPerPrice */ }: Props) {

    const [price, setPrice] = useState<any>();
    const [range, applyRange] = useState(1);
    const [productPrice, applyProductPrice] = useState<number | undefined>(45);
    const [wordsPerPrice, setWordsPerPrice] = useState(4000);
    const [priceId, setPriceId] = useState();

    useEffect(() => {
        if (productPrice) {
            if (product.prices!.length > 1) {
                setPrice(<span>{productPrice}€<span className={s.period}>/artículo</span></span>)
            } else {
                setPrice(<span>{product!.prices![0].unit_amount! / 100}€<span className={s.period}>/mes</span></span>)
            }
        }
    }, [productPrice])

    function handleChange(e: any) {
        applyRange(e.target.value)
        applyProductPrice(product!.prices![e.target.value].unit_amount! / 100);
    }

    useEffect(() => {
        if (productPrice) {
            switch (productPrice) {
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

    useEffect(() => {
        if (product) {
            setPriceId(product.prices!.length > 1 ? product.prices![range].id : product.prices![0].id);
        }
    }, [])

    return (
        <div className={`${s.root} ${product.prices!.length > 1 ? s.payment : s.subscription}`}>
                {
                    product.prices!.length > 1 &&
                    <>
                        <span className={s.wordsPerPrice}>{wordsPerPrice} palabras</span>
                        <div className={s.rangeWrapper}>
                            <span>1000</span>
                            <Range
                                min="0"
                                max="2"
                                value={range}
                                onChange={handleChange}
                                step="1"
                            />
                            <span>6000</span>
                        </div>
                    </>
                }
            <div /* className={} */>
                <span className={s.name}>{product.name == "Palabras" ? `${wordsPerPrice} ${product.name}` : product.name}</span>
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
        </div>
    )
}
