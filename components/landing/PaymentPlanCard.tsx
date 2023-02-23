import { useEffect, useState } from 'react';
import s from '../../styles/css/PlanCard.module.css';
import ArrowSVG from '../icons/Arrow';
import Button from '../ui/Button';
import Range from '../ui/Range';

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
                case 30:
                    setWords("1000");
                    break;
                case 48:
                    setWords("2000");
                    break;
                case 66:
                    setWords("3000");
                    break;
                case 85:
                    setWords("4000");
                    break;
                case 103:
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
                
                <ul className={s.description}>
                    <li>Redacción SEO</li>
                    <li>Artículos (mínimo de 500 palabras)</li>
                    <li>Correcciones sin límites</li>
                </ul>
                <p className={s.price}>{price}€<span className={s.period}>/IVA incl.</span></p>
                {/* <Button
                    type="button"
                    disabled={isLoading}
                    loading={priceIdLoading === product.prices[rangeValue].id}
                    onClick={() => handleCheckout(priceItem, "payment")}
                >
                    Comprar palabras
                </Button> */}
            </div>
        </div>
    )
}
