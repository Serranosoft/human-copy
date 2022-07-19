import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from 'components/ui/Navbar';
import Footer from 'components/ui/Footer';
import { ReactNode, useEffect } from 'react';
import { PageMeta } from '../types';

interface Props {
    children: ReactNode;
    meta?: PageMeta;
}

export default function Layout({ children, meta: pageMeta }: Props) {
    const router = useRouter();
    const meta = {
        title: 'HumanCopy - Servicio de contenido ilimitado',
        description: 'El #1 servicio de redacción premium ilimitada sin IA para empresas y emprendedores',
        cardImage: '/og.jpg',
        ...pageMeta
    };

    useEffect(() => {
        window.addEventListener("scroll", animation);
    }, [])
    
    function animation() {
        const onScrollEls = document.querySelectorAll(".on-scroll");
        let windowHeight = 0;
        let elementTop = 0;
        let elementVisible = 0;
        for (let i = 0; i < onScrollEls.length; i++) {
            
            windowHeight = window.innerHeight;
            elementTop = onScrollEls[i].getBoundingClientRect().top;
            elementVisible = 20;
            if (elementTop < windowHeight - elementVisible) {
                console.log("Añadir active");
                onScrollEls[i].classList.add("active");

            } else {
                console.log("Eliminar active");
                onScrollEls[i].classList.remove("active");
            }
        }
    }

    return (
        <>
            <Head>
                <title>HumanCopy - Servicio de contenido ilimitado</title>
                <meta name="robots" content="follow, index" />
                <link href="/HC_1.svg" rel="shortcut icon" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
                <meta content={meta.description} name="description" />
                <meta property="og:url" content={`https://subscription-starter.vercel.app${router.asPath}`} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.cardImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@vercel" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.cardImage} />
                <meta name="google-site-verification" content="zbUw2omZKSJuGlQdmrEyEikPIPQnzuzZ6c0Dr_jFtlQ" />
            </Head>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}
