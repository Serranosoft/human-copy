import s from '../styles/css/RequestCard.module.css';
import Button from './ui/Button';
import LoadingBar from './ui/LoadingBar';

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

        console.log(request);
    return (
        <div className={s.root}>
            <div className={s.header}>
                <div>
                {
                    request.download !== null && request.download !== "" ?
                        <span>✔️</span>
                        :
                        <LoadingBar big={false} />
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
                <Button disabled={request.download === null || request.download === ""}>
                    <a href={request.download !== null || request.download !== "" ? request.download : ""}>DESCARGAR</a>
                </Button>
                <Button disabled={request.download === null || request.download === ""}>CORREGIR</Button>
                <span>{request.priority === true && "Artículo prioritario"}</span>
            </div>
        </div>
    )
}