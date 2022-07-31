import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import s from '../styles/css/Home.module.css';
import Pricing from '@/components/Pricing';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Description from '@/components/Description';
import Stepbystep from '@/components/Stepbystep';
import HowWeWork from '@/components/HowWeWork';
import WhoWeAre from '@/components/WhoWeAre';

interface Props {
    products: Product[];
}

export default function Home({ products }: Props) {
    return (
        <>
            <section className={s.root}>

                <Hero />

                <Stats />
                
                <WhoWeAre />

                <HowWeWork />

                <Description />

                
                <Stepbystep />

               
                <Pricing
                    products={products}
                />
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