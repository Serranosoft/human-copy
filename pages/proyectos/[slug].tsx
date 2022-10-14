import { getAllSlugs, getPostBySlug } from "pages/api/wordpress";
import s from '@/styles/css/proyecto.module.css';
import Head from "next/head";

export default function slug({ data }: { data: any }) {
    console.log(data);
    return (
        <>
            <Head>
                <title>{`${data.title} - Humancopy`}</title>
                <meta name="twitter:title" content={data.title} />
                <meta name="twitter:image" content={data.featuredImage.node.sourceUrl} />
                <meta property="og:url" content={`https://humancopy.es/proyectos/${data.slug}`} />
                <meta property="og:image" content={data.featuredImage.node.sourceUrl} />
                <meta property="og:title" content={data.title} />
            </Head>

            <section className={s.root}>
                <div>
                    <h1>{data.title}</h1>
                    {data.featuredImage && <img src={data.featuredImage.node.sourceUrl} />}
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
            </section>
        </>
    )
}

export const getStaticPaths = async () => {

    const allPosts = await getAllSlugs();
    return {
        paths: allPosts.edges.map(({ node }: { node: any }) => `/proyectos/${node.slug}`),
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {

    const data = await getPostBySlug(context.params.slug)
    return {
        props: {
            data
        },
    };
}