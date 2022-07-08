import { useEffect, useState } from 'react';
import s from '../styles/css/PlanCard.module.css';
import ArrowSVG from './icons/Arrow';
import LeftLine from './icons/LeftLine';
import Button from './ui/Button';
import Range from './ui/Range';

interface Props {
    product: any;
    isLoading: boolean;
    priceIdLoading?: string;
    handleCheckout: any;
}

export default function PaymentPlanCard({ product, isLoading, priceIdLoading, handleCheckout }: Props) {

    // Id del precio a mandar a checkout
    const [priceItem, setPriceItem] = useState<any>();
    // Precio total del producto
    const [price, setPrice] = useState<number>();
    // Rango escogido por el usuario
    const [rangeValue, setRangeValue] = useState(4);
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
                case 10:
                    setWords("1000");
                    break;
                case 20:
                    setWords("2000");
                    break;
                case 30:
                    setWords("3000");
                    break;
                case 40:
                    setWords("4000");
                    break;
                case 50:
                    setWords("5000");
                    break;
                case 60:
                    setWords("6000");
                    break;
                case 70:
                    setWords("7000");
                    break;
                case 80:
                    setWords("8000");
                    break;
                case 90:
                    setWords("9000");
                    break;
                case 100:
                    setWords("10000");
                    break;
            }
        }
    }, [price])

    return (
        <div className={`${s.root} ${s.payment}`}>
            <div className={s.rangeWrapper}>
                {/* <span className={s.wordsPerPrice}>{words} palabras</span> */}
                <span>1000</span>
                <Range
                    min="0"
                    max="9"
                    value={rangeValue}
                    onChange={handleChange}
                    step="1"
                />
                <span>10000</span>
            </div>
            <ArrowSVG className={s.stepLine}/>
            <div>
                <span className={s.name}>{`${words} ${product.name}`}</span>
                <p className={s.description}>{product.description}qqqqqqqqqqqqqq</p>
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
