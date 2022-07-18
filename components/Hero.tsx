import HeroSVG from '@/components/icons/Hero';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import s from '../styles/css/Hero.module.css';
import { useContext, useRef } from 'react';
import { ScrollContext } from '@/utils/scroll-observer';
import { useUser } from '@supabase/supabase-auth-helpers/react';

export default function Hero() {

    const { user, isLoading } = useUser();
    const refContainer = useRef<HTMLDivElement>(null);
    const { scrollY } = useContext(ScrollContext);

    let progress = 0;
    const {current: elContainer} = refContainer;

    if (elContainer) {
        progress = Math.min(1, scrollY / elContainer.clientHeight);
    }

    return (
        <div className={s.hero} ref={refContainer} style={{ transform: `translateY(-${progress * 20}vh` }}>
            <div>
                <p className={s.title}>Lorem ipsum <span>dolor</span> sit amet.</p>
                <span>Pirsch is a simple, cookie-free, and open-source web analytics solution that easily integrates into your website or backend.</span>
                <div>
                    <Button><a href="#pricingPanel">Ver planes</a></Button>
                    {!user && !isLoading && <Button><Link href="/iniciar-sesion"><a>Prueba una demo gratuita</a></Link></Button>}
                </div>
            </div>
            <HeroSVG />
        </div>
    )
}