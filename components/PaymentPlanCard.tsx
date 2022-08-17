import { useEffect, useState } from 'react';
import s from '../styles/css/PlanCard.module.css';
import ArrowSVG from './icons/Arrow';
import Button from './ui/Button';
import Range from './ui/Range';

interface Props {
    product: any;
    isLoading: boolean;
    priceIdLoading?: string;
    handleCheckout: any;
}

export default function PaymentPlanCard({ product, isLoading, priceIdLoading, handleCheckout }: Props) {


    console.log(product);
    // Id del precio a mandar a checkout
    const [priceItem, setPriceItem] = useState<any>();
    // Precio total del producto
    const [price, setPrice] = useState<number>();
    // Rango escogido por el usuario
    const [rangeValue, setRangeValue] = useState(0);
    // Cantidad de palabras que el usuario comprará
    const [words, setWords] = useState("");

    function handleChange(e: any) {
        setRangeValue(e.target.value);
    }

    useEffect(() => {
        setPrice(product.prices![rangeValue].unit_amount / 100);
        setPriceItem(product.prices![rangeValue]);
    }, [rangeValue])

    useEffect(() => {
        if (price) {
            switch (price) {
                case 25:
                    setWords("1000");
                    break;
                case 40:
                    setWords("2000");
                    break;
                case 55:
                    setWords("3000");
                    break;
                case 70:
                    setWords("4000");
                    break;
                case 85:
                    setWords("5000");
                    break;
            }
        }
    }, [price])

    return (
        <div className={`${s.root} ${s.payment}`}>
            <div className={s.rangeWrapper}>
                <span>1.000</span>
                <Range
                    min="0"
                    max="4"
                    value={rangeValue}
                    onChange={handleChange}
                    step="1"
                    id="range"
                />
                <span>5.000</span>
            </div>
            <ArrowSVG className={s.paymentArrow}/>
            <div>
                <span className={s.name}>{`${words} ${product.name}`}</span>
                <p className={s.description}>{product.description}</p>
                <p className={s.price}>{price}€</p>
                <Button
                    type="button"
                    disabled={isLoading}
                    loading={priceIdLoading === product.prices[rangeValue].id}
                    onClick={() => handleCheckout(priceItem, "payment")}
                >
                    Comprar palabras
                </Button>
            </div>
        </div>
    )
}
