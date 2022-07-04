import { useEffect, useRef, useState } from 'react';
import s from '../styles/css/RequestCard.module.css';
import Button from './ui/Button';
import LoadingBar from './ui/LoadingBar';
import ModalComponent from './ui/Modal/ModalComponent';
import emailjs from '@emailjs/browser';
import { useUser } from '@/utils/useUser';

export interface Request {
    id: string;
    finished: boolean | undefined;
    title: string | undefined;
    topic: string | undefined;
    description: string | undefined;
    download: string | undefined;
    words: string | undefined;
    priority: boolean;
    deliver_date: string | undefined;
}

export default function RequestCard({ request }: { request: Request }) {

    const user = useUser();
    // @ts-ignore
    const form = useRef();

    // Evento setModal para abrir el modal
    const [open, setModal] = useState(false);
    const [email, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    // Función para cerrar el modal de las requests
    function closeModal() {
        setModal(false);
    }

    // Función para abrir el modal de las requests
    function openModal() {
        setModal(true);
    }

    useEffect(() => {
        setUserEmail(user.user!.email!);
    }, [user])

    const sendEmail = (e: any) => {
        e.preventDefault();
        if (document.querySelector("textarea")!.textContent!.length < 1) {
            alert("Está vacío");
        } else {
            alert("No está vacío");
        }
        setLoading(true);
        // @ts-ignore
        emailjs.sendForm('gmail', 'revision-template', form.current, '9dhtWpXmYtsl7bC1r')
            .then((result: any) => {
                console.log(result.text);
                setModal(false)
            }, (error: any) => {
                console.log(error.text);
            });
    };

    return (
        <>
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
                    <Button disabled={request.download === null || request.download === ""} onClick={openModal}>CORREGIR</Button>
                    <span>{request.priority === true && "Artículo prioritario"}</span>
                </div>
            </div>
            {email !== "" &&
                <ModalComponent
                    open={open}
                    closeModal={closeModal}
                >
                    {/* @ts-ignore */}
                    <form ref={form}>
                        <div>
                            <p>{request.title}</p>
                        </div>
                        <div className="hide">
                            <label>Identificador del usuario</label>
                            <input name="email" value={email} readOnly />
                        </div>
                        <div className="hide">
                            <label>Identificador del artículo</label>
                            <input name="requestId" value={request.id} readOnly />
                        </div>
                        <div className="hide">
                            <label>Descripción del artículo</label>
                            <input name="requestDescription" value={request.description} readOnly />
                        </div>
                        <div>
                            <label>Detalla la corrección</label>
                            <textarea name="message"></textarea>
                        </div>
                        <Button disabled={loading === true} onClick={sendEmail}>Enviar corrección</Button>
                    </form>
                </ModalComponent>
            }
        </>
    )
}