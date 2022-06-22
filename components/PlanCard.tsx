 import { useEffect, useState } from 'react';
import s from '../styles/css/PlanCard.module.css';
import Button from './ui/Button';
import Range from './ui/Range';

interface Props {
    product: any;
    isLoading: boolean;
    priceIdLoading?: string;
    handleCheckout: any;
    buttonText: string;
    paymentType: string;
}

/*export default function PlanCard({ product, isLoading, priceIdLoading, handleCheckout, buttonText, paymentType}: Props) {

    const [price, setPrice] = useState<any>();
    const [range, applyRange] = useState(5);
    const [productPrice, applyProductPrice] = useState<number | undefined>(50);
    const [wordsPerPrice, setWordsPerPrice] = useState(5000);
    const [priceId, setPriceId] = useState();

    useEffect(() => {
        if (productPrice) {
            if (product.prices!.length > 1) {
                setPrice(<span>{productPrice}€<span className={s.period}>/pago único</span></span>)
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
                case 10:
                    setWordsPerPrice(1000);
                    break;
                case 20:
                    setWordsPerPrice(2000);
                    break;
                case 30:
                    setWordsPerPrice(3000);
                    break;
                case 40:
                    setWordsPerPrice(4000);
                    break;
                case 50:
                    setWordsPerPrice(5000);
                    break;
                case 60:
                    setWordsPerPrice(6000);
                    break;
                case 70:
                    setWordsPerPrice(7000);
                    break;
                case 80:
                    setWordsPerPrice(8000);
                    break;
                case 90:
                    setWordsPerPrice(9000);
                    break;
                case 100:
                    setWordsPerPrice(10000);
                    break;
            }
        }
    }, [productPrice])

    useEffect(() => {
        setPriceId(product.prices!.length > 1 ? product.prices![range].id : product.prices![0].id)
    }, [range])

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
                                max="9"
                                value={range}
                                onChange={handleChange}
                                step="1"
                            />
                            <span>10000</span>
                        </div>
                    </>
                }
            <div className={}>
                <span className={s.name}>{product.name == "Palabras" ? `${wordsPerPrice} ${product.name}` : product.name}</span>
                <p className={s.description}>{product.description}</p>
                <p className={s.price}>{price}</p>
                <Button
                    type="button"
                    disabled={isLoading}
                    loading={priceIdLoading === priceId}
                    onClick={() => handleCheckout(priceId, paymentType)}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    )
}
 */