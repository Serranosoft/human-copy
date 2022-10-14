import { getAllSlugs, getPostBySlug } from "pages/api/wordpress";
import s from '@/styles/css/project.module.css';

export default function slug({data}: {data: any}) {

    return (
        <section className={s.root}>
            <div>
                <h1>{data.title}</h1>
                {data.featuredImage && <img src={data.featuredImage.node.sourceUrl} />}
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
        </section>
    )
}

export const getStaticPaths = async () => {
    
    const allPosts = await getAllSlugs();
    return {
        paths: allPosts.edges.map(({ node }: {node: any}) => `/proyectos/${node.slug}`),
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