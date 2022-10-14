import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import s from '../styles/css/Home.module.css';
import Pricing from '@/components/landing/Pricing';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Description from '@/components/landing/Description';
import Stepbystep from '@/components/landing/Stepbystep';
import HowWeWork from '@/components/landing/HowWeWork';
import WhoWeAre from '@/components/landing/WhoWeAre';
import Faq from '@/components/landing/FAQ';
import { useEffect, useState } from 'react';

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

               {products && products.length > 0 &&
               
                <Pricing
                    products={products}
                />
                }

                <Faq />

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