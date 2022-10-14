import { supabase } from '@/utils/supabase-client';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import { User } from '@supabase/supabase-auth-helpers/react';
import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import RequestCard from '../components/landing/RequestCard';
import { Data } from '@/utils/data';
import LoadingBar from '@/components/ui/LoadingBar';
import { clearErrors, setError } from '@/utils/helpers';
import Link from 'next/link';
import AddRequestModal from '@/components/ui/Modals/AddRequestModal';
import s from '../styles/css/Mis-textos.module.css';

export interface Request {
    id: string;
    finished: boolean | undefined;
    title: string | undefined;
    topic: string | undefined;
    description: string | undefined;
    download_pdf: string | undefined;
    download_odt: string | undefined;
    download_word: string | undefined;
    words: string | undefined;
    priority: boolean;
}

export default function Requests({ user }: { user: User }) {

    const [allRequests, setAllRequests] = useState<Request[]>([]);
    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        if (user) {
            getReq();
            getPlan();
        }
    }, [user])

    async function getPlan() {
        const { data, error } = await supabase.from('users').select('plan').eq("id", user.id).single();
        if (!error) {
            setPlan(data.plan);
            setInitialPlan(data.plan);
        } else {
            // setErrorModal(true);
            // setErrorMsg("Ha ocurrido un error al obtener tus datos. Actualiza la página o ponte en contacto con nosotros.")
        }
    }

    const [plan, setPlan] = useState<number>();
    const [initialPlan, setInitialPlan] = useState<number>();


    // Obtenemos las requests del usuario
    async function getReq() {
        const { data, error }: { data: any; error: any } = await supabase.from('requests').select('id, title, topic, description, finished, words, priority, download_pdf, download_odt, download_word').eq("user_id", user.id);
        if (!error) {
            setAllRequests(data);
        } else {
            // setErrorModal(true);
            // setErrorMsg("Ha ocurrido un error al obtener tus datos. Actualiza la página o ponte en contacto con nosotros.")
        }
    }

    function renderRequests() {
        if (allRequests !== null && allRequests.length < 1 && initialPlan !== undefined && initialPlan < 1) {
            // Si AllRequest no es nulo y allRequest.length < 1 entonces mostrar dummy data.
            let dummyData = Data.DummyRequests;
            return (
                <>
                    <div className={s.infobox}>
                        <p>No tienes contratado ningún plan.</p>
                        <span>El contenido que estas viendo es de prueba. Para pedir artículos y poder acceder a todas las funcionalidades <span>debes contratar un plan.</span></span>
                        <Button><Link href="/#pricingPanel"><a>Ver precios</a></Link></Button>
                    </div>
                    <div className={s.dashboard}>
                        {
                            dummyData.map(request => {
                                return (
                                    <RequestCard
                                        key={request.id}
                                        request={request}
                                        user={user}
                                    />
                                )
                            })
                        }
                    </div>
                </>
            )
        } else if (allRequests !== null && allRequests.length > 0 || initialPlan! > 0) {
            // Si AllRequest no es nulo y allRequest.length > 0 entonces mostrar los requests.
            return (
                <>
                    {
                        allRequests &&
                        <div className={s.dashboard}>
                            {
                                allRequests.map(request => {
                                    return (
                                        <RequestCard
                                            key={request.id}
                                            request={request}
                                            user={user}
                                        />
                                    )
                                })
                            }
                        </div>
                    }
                </>
            )
        } else {
            // Si AllRequest es nulo entonces loading
            return (
                <div>
                    <LoadingBar />
                </div>
            )
        }
    }

    return (
        <>
            <section className={s.root}>
                <div>
                    <>
                        <div>
                            <p>Cantidad de palabras restantes: <span>{initialPlan === -1 ? "Ilimitado" : plan}</span></p>
                            <Button onClick={() => setModalState(true)}>Envíar un artículo</Button>
                        </div>
                        {
                            renderRequests()
                        }
                        <div className={s.delivery}>
                            <h1>Tiempos de entrega.</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Palabras</th>
                                        <th>Tiempo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1000</td>
                                        <td>1 día</td>
                                    </tr>
                                    <tr>
                                        <td>2000</td>
                                        <td>1 día</td>
                                    </tr>
                                    <tr>
                                        <td>3000</td>
                                        <td>2 días</td>
                                    </tr>
                                    <tr>
                                        <td>4000</td>
                                        <td>2 - 3 días</td>
                                    </tr>
                                    <tr>
                                        <td>5000</td>
                                        <td>3 días</td>
                                    </tr>
                                    <tr>
                                        <td>6000</td>
                                        <td>4-5 días</td>
                                    </tr>
                                    <tr>
                                        <td>+6000</td>
                                        <td>+6 días</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>El tiempo de entrega de cada artículo puede variar ya que <span>esta sujeto a la cantidad de artículos que solicite.</span></p>
                        </div>
                    </>
                </div>
            </section>
            {initialPlan !== undefined &&
                <AddRequestModal
                    user={user}
                    show={modalState}
                    setModalState={setModalState}
                    getReq={getReq}
                    getPlan={getPlan}
                    initialPlan={initialPlan!}
                    setInitialPlan={setInitialPlan}
                />
            }
        </>

    )

}

export const getServerSideProps = withAuthRequired({ redirectTo: '/iniciar-sesion' });