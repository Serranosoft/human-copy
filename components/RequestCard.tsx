import s from '../styles/css/Mis-textos.module.css';
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

    return (
        <div>
            <span className={s.title}>{request.title !== null ? request.title : "(HumanCopy redactará un título)"}</span>
            <span className={s.words}>{request.words} palabras</span>
            <span className={s.description}>{request.description}</span>
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
    )
}