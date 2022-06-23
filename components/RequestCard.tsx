import s from '../styles/css/RequestCard.module.css';
import LoadingDots from '@/components/ui/LoadingDots';

export interface Request {
    finished: boolean | undefined;
    title: string | undefined;
    topic: string | undefined;
    description: string | undefined;
    download: string | undefined;
    words: string | undefined;
}

export default function RequestCard({request}: { request: Request }) {
    // https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners
    return (
        <div className={s.root}>
            <div className={s.cardBody}>
                <span>Fecha de entrega estimada: 28/06/22</span>
                <span className={s.title}>{request.title !== null ? request.title : "(HumanCopy redactará un título)"}</span>
                <span className={s.words}>{request.words} palabras</span>
                <span className={s.description}>{request.description}</span>
            </div>
            <img src="" className={s.separator} />
            <div className={s.cardFooter}>
                {
                    request.download !== null && request.download !== "" ?
                        <a className={s.download} download={request.title !== null ? request.title : "Sin nombre"} href={request.download} title={`Descargar ${request.title} en PDF`}>Descargar</a>
                        :
                        <div className={s.download}>
                            <span>Pendiente</span>
                            <i>
                                <LoadingDots />
                            </i>
                        </div>
                }
            </div>
        
        </div>
    )
}