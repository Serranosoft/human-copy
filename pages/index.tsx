import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import s from '../styles/css/Home.module.css';
import Button from '@/components/ui/Button';

interface Props {
    products: Product[];
}

export default function Home({ products }: Props) {
    return (
        <>
            <section className={s.root}>
                <div className={s.hero}>
                    <p className={s.title}>Lorem ipsum dolor sit amet.</p>
                    <span>Pirsch is a simple, cookie-free, and open-source web analytics solution that easily integrates into your website or backend.</span>
                    <Button>Ver los planes</Button>
                </div>
            </section>
        
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