import s from '../styles/css/RequestCard.module.css';
import LoadingDots from '@/components/ui/LoadingDots';
import Button from './ui/Button';

export interface Request {
    finished: boolean | undefined;
    title: string | undefined;
    topic: string | undefined;
    description: string | undefined;
    download: string | undefined;
    words: string | undefined;
    deliver_date: string | undefined;
    priority: boolean;
}

export default function RequestCard({request}: 
    { request: Request | 
    {
        title: string;
        description: string;
        topic: string;
        words: number;
        deliver_date: string;
        download: string;
        finished: boolean;
        priority: boolean;
    } }) {
    return (
        <div className={s.root}>
            <div className={s.header}>
                <div style={{border: request.download !== null && request.download !== "" ? "1px solid #16c60c" : "1px solid gray"}}>
                {
                    request.download !== null && request.download !== "" ?
                        <span>✔️</span>
                        :
                        <LoadingDots />
                }
                </div>
                <p className={s.date}>{`Entrega est. ${request.deliver_date}`}</p>
            </div>
            <div className={s.info}>
                <p className={s.title}>{request.title}</p>
                <p className={s.words}>{request.words} palabras</p>
            </div>
            <div className={s.description}>
                <p>Descripción</p>
                <p>{request.description}</p>
            </div>
            <div>
                <Button disabled={request.download === null || request.download === ""}>DESCARGAR</Button>
                <span>{request.priority === true && "Artículo prioritario"}</span>
            </div>
        </div>
    )
}