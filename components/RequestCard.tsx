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
}

export default function RequestCard({request}: { request: Request }) {
    return (
        <div className={s.root}>
            <div className={s.header}>
                <div style={{border: request.download !== null && request.download !== "" ? "1px solid #16c60c" : "1px solid gray"}}>
                {
                    request.download !== null && request.download !== "" ?
                        <span>✔️</span>
                        :
                        <i>
                            <LoadingDots />
                        </i>
                }
                </div>
                <p className={s.date}><span>28-06-22</span><span> /aprox.</span></p>
            </div>
            <div className={s.info}>
                <p className={s.title}>{request.title !== null ? request.title : "(HumanCopy redactará un título)"}</p>
                <p className={s.words}>{request.words} palabras</p>
            </div>
            <div className={s.description}>
                <p>Descripción</p>
                <p>{request.description}</p>
            </div>
            <Button disabled={request.download === null || request.download === ""}>DESCARGAR</Button>
        </div>
    )
}