import { useEffect, useRef, useState } from 'react';
import s from '../styles/css/RequestCard.module.css';
import Button from './ui/Button';
import LoadingBar from './ui/LoadingBar';
import ModalComponent from './ui/Modal/ModalComponent';
import emailjs from '@emailjs/browser';
import { useUser } from '@/utils/useUser';
import ErrorModalComponent from './ui/Error Modal/ErrorModalComponent';
import DownloadSVG from './icons/Download';
import ReviewSVG from './icons/Review';

export interface Request {
    id: string;
    finished: boolean | undefined;
    title: string | undefined;
    topic: string | undefined;
    description: string | undefined;
    download: string | undefined;
    words: string | undefined;
    priority: boolean
}

export default function RequestCard({ request, user }: { request: Request, user: any }) {
    const form = useRef();

    // Almacenar el email del usuario autenticado
    const userEmail = useRef() as React.MutableRefObject<string>;;
    // Evento setModal para abrir el modal
    const [open, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [review, setReview] = useState("");
    // Evento setModal para abrir el modal de error
    const [openError, setErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error inesperado. Ponte en contacto con nosotros.")

    // Función para cerrar el modal de las requests
    function closeModal() {
        setModal(false);
    }

    // Función para cerrar el modal de las requests
    function closeErrorModal() {
        setErrorModal(false);
    }

    // Función para abrir el modal de las requests
    function openModal() {
        setModal(true);
    }

    useEffect(() => {
        userEmail.current! = user.email;
    }, [user])

    const sendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (review === "") {
            // setModal(false);
            setErrorModal(true);
            setErrorMsg("Indica las correcciones que necesitas en la caja de texto");
        } else {
            setLoading(true);
            emailjs.sendForm('gmail', 'revision-template', form.current!, '9dhtWpXmYtsl7bC1r')
                .then((result: any) => {
                    setModal(false);
                    setLoading(false);
                }, (error: any) => {
                    setErrorModal(true);
                    setErrorMsg("Ha ocurrido un error al envíar la corrección. Ponte en contacto con nosotros");
                });
        }
    };

    function handleReview(e: { target: HTMLTextAreaElement; }) {
        setReview(e.target!.value);
    }

    return (
        <>
            <div className={s.root}>
                <div className={s.header}>
                    <div>
                        {
                            request.download !== null && request.download !== "" ? <span>✔️</span> : <LoadingBar big={false} />
                        }
                    </div>
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
                    <span>{request.priority === true && "Artículo prioritario"}</span>
                    {
                        request.download !== null && request.download !== "" &&
                        <>
                            <a href={request.download}>
                                <DownloadSVG />
                            </a>
                            <div onClick={openModal}>
                                <ReviewSVG></ReviewSVG >
                            </div>
                        </>
                    }
                </div>
            </div>
            {userEmail.current !== "" &&
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
                            <input name="email" value={userEmail.current} readOnly />
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
                            <textarea onChange={handleReview} name="message"></textarea>
                        </div>
                        <Button disabled={loading === true} onClick={sendEmail}>Enviar corrección</Button>
                    </form>
                </ModalComponent>
            }
            <ErrorModalComponent
                open={openError}
                closeErrorModal={closeErrorModal}
                msg={errorMsg}>
            </ErrorModalComponent>
        </>
    )
}