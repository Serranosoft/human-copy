import { useRef, useState } from "react";
import Button from "../Button";
import emailjs from '@emailjs/browser';
import Modal from "./Modal";
import s from '@/styles/css/EditRequestModal.module.css';
import Input from "../Input";


export interface Request {
    id: string;
    finished: boolean | undefined;
    title: string | undefined;
    topic: string | undefined;
    description: string | undefined;
    download_odt: string | undefined;
    download_pdf: string | undefined;
    download_word: string | undefined;
    words: string | undefined;
    priority: boolean
}

export default function EditRequestModal({ show, setModalState, request, mail }: { show: boolean, setModalState: Function, request: Request, mail: string }) {

    const form = useRef();

    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);

    const sendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert(review);
        if (review === "") {
            // setErrorModal(true);
            // setErrorMsg("Indica las correcciones que necesitas en la caja de texto");
        } else {
            setLoading(true);
            alert("Exito, mandando email.")
            emailjs.sendForm('gmail', 'revision-template', form.current!, '9dhtWpXmYtsl7bC1r')
                .then((result: any) => {
                    // setModalState(false);
                    setLoading(false);
                    let modal = document.querySelector(".modal")! as HTMLElement;
                    modal.style.display = "none";
                }, (error: any) => {
                    // setErrorModal(true);
                    // setErrorMsg("Ha ocurrido un error al envíar la corrección. Ponte en contacto con nosotros");
                });
        }
    };

    function handleReview(e: { target: HTMLTextAreaElement; }) {
        setReview(e.target.value);
    }

    return (
        <>
            <Modal show={show} setModalState={setModalState}>
                <div className={s.root}>
                    {/* @ts-ignore */}
                    <form ref={form} onSubmit={sendEmail}>
                        <div>
                            <p>Artículo: {request.title}</p>
                        </div>
                        <div>
                            <label>Identificador del usuario</label>
                            <Input name="email" value={mail} readOnly disabled/>
                        </div>
                        <div>
                            <label>Identificador del artículo</label>
                            <Input name="requestId" value={request.id} readOnly disabled/>
                        </div>
                        <div>
                            <label>Descripción del artículo</label>
                            <Input name="requestDescription" value={request.description} readOnly disabled/>
                        </div>
                        <div>
                            <label>Detalla la corrección</label>
                            <textarea value={review} onChange={handleReview} name="message"></textarea>
                        </div>
                    </form>
                    <div>
                        <Button disabled={loading === true}>Enviar corrección</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}