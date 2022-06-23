import { supabase } from '@/utils/supabase-client';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import { User } from '@supabase/supabase-auth-helpers/react';
import { useEffect, useState } from 'react';
import s from '../styles/css/Mis-textos.module.css';
import ModalComponent from '@/components/ui/Modal/ModalComponent';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingDots from '@/components/ui/LoadingDots';
import Range from '@/components/ui/Range';
import RequestCard from '@/components/RequestCard';

export interface Request {
    finished: boolean | undefined;
    title: string | undefined;
    topic: string | undefined;
    description: string | undefined;
    download: string | undefined;
    words: string | undefined;
}

export default function Requests({ user }: { user: User }) {
    
    // Objeto con datos iniciales para cargar en las requests
    const initialValue: Request = {
        finished: false,
        title: "Cargando...",
        topic: "Cargando...",
        description: "",
        download: "/",
        words: "0"
    }

    // Objeto request para cargar una request a la bd
    const [request, setRequest] = useState<Request>(initialValue);
    // Objetos requests que tiene el usuario registrados
    const [allRequests, setAllRequests] = useState<Request[]>();
    // Evento setModal para abrir el modal
    const [open, setModal] = useState(false);
    // Variable para almacenar el rango de palabras que el usuario ha escogido para el artículo
    const [range, applyRange] = useState<number>(0);
    // Variable para almacenar el plan actualizado tras enviar un artículo
    const [plan, setPlan] = useState<number>();
    // Variable para almacenar el plan inicial del usuario
    const [initialPlan, setInitialPlan] = useState<number>();

    // Al obtener el usuario, se obtiene sus requests y su plan
    useEffect(() => {
        getReq();
        getPlan();
    }, [user])
    
    // Obtenemos el plan del usuario
    async function getPlan() {
        const { data, error }: { data: any; error: any } = await supabase.from('users').select('plan').eq("id", user.id)
        setPlan(data[0].plan);
        setInitialPlan(data[0].plan);
    }

    // Obtenemos las requests del usuario
    async function getReq() {
        const { data, error }: { data: any; error: any } = await supabase.from('requests').select('title, topic, description, finished, words, download').eq("user_id", user.id);
        setAllRequests(data);
    }

    // Enviamos una request a la base de datos
    async function submitReq(e: any) {
        e.preventDefault();
        const { data, error }: { data: any; error: any } = await supabase.from('requests').insert([{
            id: Date.now(),
            user_id: user.id,
            title: request.title,
            topic: request.topic,
            description: request.description,
            finished: false,
            words: request.words
        }]);

        await supabase.from("users").update([{
            plan: plan
        }]).match({ id: user.id }).then(({data, error}) => {
            if (!data || error) {
                // WIP: Modal de error.
            } else {
                setInitialPlan(data![0].plan)
            }
        });

        if (!error) {
            setModal(false)
            getReq();
            getPlan();
            setRequest(initialValue);
        } else{
            // WIP: Modal de error.
        }
    }

    // Función para obtener los valores de los campos de una request
    function handleChange(e: any) {
        const value = e.target.value;
        setRequest({
            ...request,
            [e.target.name]: value
        });
    }

    // Función para abrir el modal de las requests
    function openModal() {
        setModal(true);
    }

    // Función para cerrar el modal de las requests
    function closeModal() {
        setModal(false);
    }

    // Función para manipular la cantidad de palabras que el usuario ha elegido para un artículo, a su vez, actualiza el plan restante.z
    function handleWords(e: any) {
        e.preventDefault();
        // Restar cuando sube el rango y devolver el valor al plan cuando disminuye el rango
        setPlan(initialPlan!-parseInt(e.target.value));
        applyRange(parseInt(e.target.value))
        handleChange(e);
    }

    return (
        <>
        {plan !== undefined && plan !== null && initialPlan !== undefined && initialPlan !== undefined ?
            <section className={s.root}>
                <div>
                    <ModalComponent
                        open={open}
                        closeModal={closeModal}
                    >
                        <form onSubmit={submitReq}>
                            <div>
                                <span>Palabras disponibles: {initialPlan === -1 ? "Infinito" : plan}</span>
                            </div>
                            <div>
                                <label>Título del artículo (h1)</label>
                                <Input name="title" placeholder="¿Cómo arreglar el transmisor de la radio de mi coche?" onChange={handleChange}></Input>
                                <span className={s.muted}>Si no tienes claro un título, nosotros nos encargamos de redactar el más adecuado para el artículo</span>
                            </div>
                            <div>
                                <label>Cantidad de palabras en el artículo</label>
                                
                                <span>{range} palabras</span>
                                <Range
                                    type="range"
                                    min="0"
                                    max={initialPlan !== -1 ? initialPlan!.toString() : "10000"}
                                    value={range}
                                    onChange={handleWords}
                                    step="500"
                                    name="words"
                                />
                            </div>
                            <div>
                                <label>Temática del artículo</label>
                                <Input name="topic" placeholder="Finanzas, informática, marketing..." onChange={handleChange}></Input>
                            </div>
                            <div>
                                <label>Descripción del artículo</label>
                                <textarea name="description" onChange={handleChange}></textarea>
                            </div>
                        </form>
                        <div>
                            <Button type="submit" onClick={submitReq}>Enviar artículo</Button>
                        </div>
                    </ModalComponent>
                    <p>Cantidad de palabras restantes: <span>{initialPlan === -1 ? "Infinito" : plan}</span></p>
                    <Button onClick={openModal}>Envíar un artículo</Button>
                    {
                        allRequests ?
                            <div className={s.dashboard}>
                                {
                                    allRequests.map(request => {
                                        return (
                                            <RequestCard
                                                request={request}
                                            />
                                            
                                        )
                                    })
                                }
                            </div>
                            :
                            <i>
                                <LoadingDots />
                            </i>
                    }
                </div>
            </section>
            :
            <i>
                <LoadingDots />
            </i>
        }
        </>
    )

}

export const getServerSideProps = withAuthRequired({ redirectTo: '/iniciar-sesion' });