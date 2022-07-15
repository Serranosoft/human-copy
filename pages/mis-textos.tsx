import { supabase } from '@/utils/supabase-client';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import { User } from '@supabase/supabase-auth-helpers/react';
import React, { useEffect, useState } from 'react';
import s from '../styles/css/Mis-textos.module.css';
import ModalComponent from '@/components/ui/Modal/ModalComponent';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingDots from '@/components/ui/LoadingDots';
import Range from '@/components/ui/Range';
import RequestCard from '@/components/RequestCard';
import Select from '@/components/ui/Select';
import { Data } from '@/utils/data';
import LoadingBar from '@/components/ui/LoadingBar';
import { clearErrors, setError } from '@/utils/helpers';
import ErrorModalComponent from '@/components/ui/Error Modal/ErrorModalComponent';
import Link from 'next/link';

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

export default function Requests({ user }: { user: User }) {

    // Objeto con datos iniciales para cargar en las requests
    const initialValue: Request = {
        id: "",
        finished: false,
        title: "",
        topic: "",
        description: "",
        download: "/",
        words: "0",
        priority: false,
        deliver_date: ""
    }

    // Objeto request para cargar una request a la bd
    const [request, setRequest] = useState<Request>(initialValue);
    // Objetos requests que tiene el usuario registrados
    const [allRequests, setAllRequests] = useState<Request[]>([]);
    // Evento setModal para abrir el modal
    const [open, setModal] = useState(false);
    // Evento setModal para abrir el modal de error
    const [openError, setErrorModal] = useState(false);
    // Mensaje de error para el modal de error.
    const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error inesperado.")
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
        const { data, error } = await supabase.from('users').select('plan').eq("id", user.id)
        setPlan(data![0].plan);
        setInitialPlan(data![0].plan);
    }

    // Obtenemos las requests del usuario
    async function getReq() {
        const { data, error }: { data: any; error: any } = await supabase.from('requests').select('id, title, topic, description, finished, words, priority, deliver_date, download').eq("user_id", user.id);
        setAllRequests(data);
    }

    // Enviamos una request a la base de datos
    async function submitReq(e: any) {
        e.preventDefault();
        if (request.words === "0") {
            setError(document.getElementById("request-words-error")!);
        } else if (request.topic === "") {
            setError(document.getElementById("request-topic-error")!);
        } else if (request.description === "") {
            setError(document.getElementById("request-description-error")!);
        } else {
            // Limpiar errores
            clearErrors();

            let date = new Date();
            let days = Data.getDeliveryTime(request.words!);
            if (days != -1) {
                date.setDate(new Date().getDate() + days);
            }

            let deliver_date = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear().toString().padStart(2, "0")}`

            const { data, error } = await supabase.from('requests').insert([{
                id: Date.now(),
                user_id: user.id,
                title: request.title !== "" ? request.title : "HumanCopy redactará un título para este artículo",
                topic: request.topic,
                description: request.description,
                finished: false,
                words: request.words,
                priority: request.priority,
                deliver_date: days !== -1 ? deliver_date : "más de 6 días"
            }]);

            await supabase.from("users").update([{
                plan: plan
            }]).match({ id: user.id }).then(({ data, error }) => {
                if (!data || error) {
                    setErrorModal(true);
                    setErrorMsg("Ha ocurrido un error al actualizar tu plan. Ponte en contacto con nosotros.")
                } else {
                    setInitialPlan(data![0].plan)
                }
            });

            if (!error) {
                setModal(false)
                getReq();
                getPlan();
                // Reiniciar valores del modal
                setRequest(initialValue);
                applyRange(0);
            } else {
                setErrorModal(true);
                setErrorMsg("Ha ocurrido un error al envíar el artículo. Ponte en contacto con nosotros.")
            }
        }

    }

    // Función para obtener los valores de los campos de una request
    function handleChange(e: any) {
        clearErrors();
        let value = e.target.value;
        if (value === "true") {
            value = true;
        } else if (value === "false") {
            value = false;
        }
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

    // Función para cerrar el modal de las requests
    function closeErrorModal() {
        setErrorModal(false);
    }

    // Función para manipular la cantidad de palabras que el usuario ha elegido para un artículo, a su vez, actualiza el plan restante.z
    function handleWords(e: any) {
        e.preventDefault();
        applyRange(parseInt(e.target.value))
        handleChange(e);
        if (initialPlan !== -1) {
            // Restar cuando sube el rango y devolver el valor al plan cuando disminuye el rango
            setPlan(initialPlan! - parseInt(e.target.value));
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

        <section className={s.root}>
            <div>
                {plan !== undefined && plan !== null && initialPlan !== undefined && initialPlan !== undefined && allRequests !== null ?
                    <>
                        <ModalComponent
                            open={open}
                            closeModal={closeModal}
                        >
                            <form onSubmit={submitReq}>
                                <div>
                                    <span>Palabras disponibles: {initialPlan === -1 ? "Ilimitado" : plan}</span>
                                </div>
                                <div>
                                    <label>Título del artículo (h1)</label>
                                    <Input name="title" onChange={handleChange}></Input>
                                    <span>Si no tienes claro un título, nosotros nos encargamos de redactar el más adecuado para el artículo</span>
                                </div>
                                <div>
                                    <label>Cantidad de palabras en el artículo</label>
                                    <span>{range} palabras</span>
                                    <Range
                                        id="request-words"
                                        type="range"
                                        min="0"
                                        max={initialPlan !== -1 ? initialPlan!.toString() : "10000"}
                                        value={range}
                                        onChange={handleWords}
                                        step="500"
                                        name="words"
                                    />
                                    <span id="request-words-error" className="hide error">Como mínimo debe tener 500 palabras</span>
                                </div>
                                <div>
                                    <label>Tema / Keyword principal del artículo</label>
                                    <Input name="topic" onChange={handleChange}></Input>
                                    <span id="request-topic-error" className="hide error">Debes especificar una temática</span>
                                </div>
                                <div>
                                    <label>Descripción del artículo</label>
                                    <textarea name="description" onChange={handleChange}></textarea>
                                    <span id="request-description-error" className="hide error">Debes especificar una descripción</span>
                                </div>
                                <div>
                                    <label>Prioridad</label>
                                    <Select
                                        onChange={handleChange}
                                        name="priority"
                                        defaultValue={"false"}
                                    >
                                        <option value="true">Si</option>
                                        <option value="false">No</option>
                                    </Select>
                                    <span className={s.muted}>Si eliges 'Si', tendrémos en cuenta que el artículo es prioritario y será de los primeros textos en escribirse.</span>
                                </div>
                            </form>
                            <div>
                                <Button type="submit" onClick={submitReq}>Enviar artículo</Button>
                            </div>
                        </ModalComponent>
                        <p>Cantidad de palabras restantes: <span>{initialPlan === -1 ? "Ilimitado" : plan}</span></p>
                        <Button onClick={openModal}>Envíar un artículo</Button>
                        {
                            renderRequests()
                        }
                    </>
                    :
                    <LoadingBar />
                }
            </div>
            <ErrorModalComponent
                open={openError}
                closeErrorModal={closeErrorModal}
                msg={errorMsg}>
            </ErrorModalComponent>
        </section>
    )

}

export const getServerSideProps = withAuthRequired({ redirectTo: '/iniciar-sesion' });