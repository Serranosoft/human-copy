import { getAllPosts } from "pages/api/wordpress";
import s from '@/styles/css/blogs.module.css';
import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from 'components/icons/Logo';

export default function proyectos({data}: {data: any}) {

    return (
        <section className={s.root}>
            <div>
                <Logo />
                <p>Nuestro <span>blog</span></p>
                <div>
                    {
                        data.edges.map((blog: any) => {
                            return (
                                <div key={blog.node.id}>
                                    <span>{blog.node.title}</span>
                                    {
                                        blog.node.featuredImage &&
                                        <>
                                            <Link href={`/blog/${blog.node.slug}`}>
                                                <a>
                                                    <img src={blog.node.featuredImage.node.sourceUrl} />
                                                </a>
                                            </Link>
                                        </>
                                    }
                                    <div dangerouslySetInnerHTML={{ __html: blog.node.excerpt }} />
                                    <Button><Link href={`/blog/${blog.node.slug}`}><a>Leer</a></Link></Button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export const getStaticProps = async () => {
    const data = await getAllPosts("blog");
    return {
        props: {
            data
        }, 
    };
}