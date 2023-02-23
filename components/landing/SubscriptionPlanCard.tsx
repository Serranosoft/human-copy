import s from '../../styles/css/PlanCard.module.css';
import Button from '../ui/Button';

interface Props {
    product: any;
    isLoading: boolean;
    handleCheckout: any;
    priceIdLoading?: string;
}

export default function SubscriptionPlanCard({ product, isLoading, handleCheckout, priceIdLoading }: Props) {

    return (
        <div className={`${s.root} ${s.subscription}`}>
            <span className={s.subscriptionAnimation}></span>
        
            <div>
                <span className={s.name}>{product.name}</span>
                <ul className={s.description}>
                    <li>Redacción SEO</li>
                    <li>Email marketing incluido</li>
                    <li>Copywriting incluido</li>
                    <li>Artículos ilimitados</li>
                    <li>Correcciones sin límites</li>
                </ul>
                <p className={s.price}>{product.prices![0].unit_amount / 100}€<span className={s.period}>/mes (IVA incl.)</span></p>
                {/* <Button
                    type="button"
                    disabled={isLoading}
                    loading={priceIdLoading === product.prices![0].id}
                    onClick={() => handleCheckout(product.prices![0], "subscription")}>
                    Suscribirse
                </Button> */}
            </div>
        </div>
    )
}
