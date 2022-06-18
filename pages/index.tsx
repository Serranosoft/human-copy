import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import s from '../styles/css/Home.module.css';
import Button from '@/components/ui/Button';
import Pricing from '@/components/Pricing';

interface Props {
    products: Product[];
}

export default function Home({ products }: Props) {
    console.log(products);
    return (
        <>
            <section className={s.root}>
                <div className={s.hero}>
                    <p className={s.title}>Lorem ipsum dolor sit amet.</p>
                    <span>Pirsch is a simple, cookie-free, and open-source web analytics solution that easily integrates into your website or backend.</span>
                    <div>
                        <Button>Ver los planes</Button>
                        <Button>Prueba una demo gratuita</Button>
                    </div>
                </div>
                <div className={s.bigImg}>
                    <div>
                        <div style={{backgroundImage: "url(/sc-nt.jpg)"}}>
                            <span>Página web <span className={s.highlight}>warez</span></span>
                        </div>
                        <span>+10.000% impresiones y clics en 7 meses</span>
                    </div>
                    <div>
                        <div style={{backgroundImage: "url(/sc-tst.jpg)"}}>
                            <span>Página web de <span className={s.highlight}>series en inglés</span></span>
                        </div>
                        <span>+70% impresiones en el último mes</span>
                    </div>
                    <div>
                        <div style={{backgroundImage: "url(/sc-ce.jpg)"}}>
                            <span>Página web de <span className={s.highlight}>criptomonedas</span></span>
                        </div>
                        <span>+6000% impresiones con contenido en tendencia</span>
                    </div>
                    <span>Pon el ratón por encima de las gráficas para conocer la temática de cada proyecto</span>
                    <div>
                        <div style={{backgroundImage: "url(/sc-db.jpg)"}}>
                            <span>Página web de <span className={s.highlight}>recetas</span></span>
                        </div>
                        <span>+55% impresiones y clics en los últimos 4 meses</span>
                    </div>
                    <div>
                        <div style={{backgroundImage: "url(/sc-hf.jpg)"}}>
                            <span>Página web de <span className={s.highlight}>finanzas</span></span>
                        </div>
                        <span>Crecimiento de un 40% en impresiones/clics trimestralmente</span>
                    </div>
                    <div>
                        <div style={{backgroundImage: "url(/sc-idlt.jpg)"}}>
                            <span>Página web de <span className={s.highlight}>noticias en prensa rosa</span></span>
                        </div>
                        <span>+1250% manteniendo artículo semanal durante 2 meses y medio</span>
                    </div>
                    
                </div>
            </section>
            <Pricing 
                products={products}
            />
        </>
    
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
    const products = await getActiveProductsWithPrices();

    return {
        props: {
            products
        },
        revalidate: 60
    };
}