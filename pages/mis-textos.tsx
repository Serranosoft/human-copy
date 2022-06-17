import { supabase } from '@/utils/supabase-client';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import { User } from '@supabase/supabase-auth-helpers/react';
import { useEffect, useState } from 'react';
import s from '../styles/css/Mis-textos.module.css';
import ModalComponent from '@/components/ui/Modal/ModalComponent';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingDots from '@/components/ui/LoadingDots';

export interface Request {
    finished: boolean | undefined;
    title: string | undefined;
    description: string | undefined;
    download: string | undefined;
}

export default function Requests({ user }: { user: User }) {
    const initialValue: Request = {
        finished: false,
        title: "Cargando...",
        description: "",
        download: "/"
    }

    const [request, setRequest] = useState<Request>(initialValue);
    const [allRequests, setAllRequests] = useState<Request[]>();
    const [open, setModal] = useState(false);


    useEffect(() => {
        getReq();
    }, [user])


    async function getReq() {
        const { data, error }: { data: any; error: any } = await supabase.from('requests').select('title, finished, download').eq("user_id", user.id);
        setAllRequests(data);
    }

    async function submitReq(e: any) {
        e.preventDefault();
        const { data, error }: { data: any; error: any } = await supabase.from('requests').insert([{
            id: Date.now(),
            user_id: user.id,
            title: request.title,
            description: request.description,
            finished: false
        }]);
        if (!error) {
            setModal(false)
            getReq();
        }
    }

    function handleChange(e: any) {
        const value = e.target.value;
        setRequest({
            ...request,
            [e.target.name]: value
        });
    }

    function openModal() {
        setModal(true);
    }

    function closeModal() {
        setModal(false);
    }

    return (
        <>
            <section className={s.root}>
                <ModalComponent
                    open={open}
                    closeModal={closeModal}
                >
                    <form>
                        <div>
                            <label>Título del artículo (h1)</label>
                            <Input name="title" placeholder="¿Cómo arreglar el transmisor de la radio de mi coche?" onChange={handleChange}></Input>
                            <span className={s.muted}>Si no tienes claro un título, nosotros nos encargamos de redactar el más adecuado para el artículo</span>
                        </div>
                        <div>
                            <label>Descripción del artículo</label>
                            <textarea name="description" onChange={handleChange}></textarea>
                        </div>
                    </form>
                    <div>
                        <Button>Cerrar</Button>
                        <Button onClick={submitReq}>Enviar artículo</Button>
                    </div>
                </ModalComponent>
                <button onClick={openModal}>Abrir modal</button>
                <div className={s.dashboard}>
                    {
                        allRequests && allRequests.map(pdf => {
                            return (
                                <div>
                                    <span>{pdf.title !== null ? pdf.title : "Sin nombre"}</span>
                                    {
                                        pdf.download !== null ?
                                        <a className={s.download} download={pdf.title !== null ? pdf.title : "Sin nombre"} href={pdf.download} title={`Descargar ${pdf.title} en PDF`}>Descargar</a>
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
                        })
                    }
                </div>
            </section>
        </>
    )

}

export const getServerSideProps = withAuthRequired({ redirectTo: '/iniciar-sesion' });