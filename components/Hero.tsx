import HeroSVG from '@/components/icons/Hero';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import s from '../styles/css/Hero.module.css';
import { useContext, useRef } from 'react';
import { ScrollContext } from '@/utils/scroll-observer';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { motion } from 'framer-motion';

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
                <p className={s.title}>Redactamos <motion.span transition={{delay: 0.4, duration: 1.5}} animate={{ textShadow: "0 0 25px #34b3c1, 0 0 30px #4dbbc7"}}> contenido</motion.span> para que tú no tengas que hacerlo</p>
                <motion.p
                    animate={{
                        opacity: [0, 1]
                    }}
                    transition={{delay: 0.4}}
                >
                    Olvídate de los procesos de selección, redacción y supervisión. Te ofrecemos el mejor contenido para <span>vender y posicionar en Google.</span>
                </motion.p>
                <div>
                    <Button><a href="#pricingPanel">Ver planes</a></Button>
                    {!user && !isLoading && <Button><Link href="/registro"><a>Acceder al panel es gratis</a></Link></Button>}
                </div>
            </div>
            <HeroSVG />
        </div>
    )
}