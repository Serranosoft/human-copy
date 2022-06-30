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
import Select from '@/components/ui/Select';
import { useUser } from 'utils/useUser';

export interface Request {
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
    console.log(user);
    const {userDetails} = useUser();
    console.log(userDetails);
    // Objeto con datos iniciales para cargar en las requests
    const initialValue: Request = {
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
        const { data, error }: { data: any; error: any } = await supabase.from('requests').select('title, topic, description, finished, words, priority, deliver_date, download').eq("user_id", user.id);
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
            let days = 0;
            switch(request.words) {
                case "500":
                    days = 2;
                    break;
                case "1000":
                    days = 2;
                    break;
                case "1500":
                    days = 3;
                    break;
                case "3000":
                    days = 3;
                    break;
                case "3500":
                    days = 3;
                    break;
                case "4000":
                    days = 4;
                    break;
                case "4500":
                    days = 4;
                    break;
                case "5000":
                    days = 5;
                    break;
                case "5500":
                    days = 6;
                    break;
                default:
                    days = -1;
                    break;
            }
            days != -1 && date.setDate(new Date().getDate() + days);
            let deliver_date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
            const { data, error }: { data: any; error: any } = await supabase.from('requests').insert([{
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

    // Función para manipular la cantidad de palabras que el usuario ha elegido para un artículo, a su vez, actualiza el plan restante.z
    function handleWords(e: any) {
        e.preventDefault();
        applyRange(parseInt(e.target.value))
        handleChange(e);
        if (initialPlan !== -1) {
            // Restar cuando sube el rango y devolver el valor al plan cuando disminuye el rango
            setPlan(initialPlan!-parseInt(e.target.value));
        }
    }

    function setError(element: HTMLElement) {
        if (element.id === "request-words-error") {
            element.classList.remove("hide");
            element.classList.add("show");
        } else if (element.id === "request-topic-error") {
            element.classList.remove("hide");
            element.classList.add("show");
        } else if (element.id === "request-description-error") {
            element.classList.remove("hide");
            element.classList.add("show");
        }
    }

    function clearErrors() {
        document.querySelectorAll("span.error").forEach(span => {
            span.classList.add("hide");
            span.classList.remove("show");
        })
    }

    return (
        
    <section className={s.root}>
        {plan !== undefined && plan !== null && initialPlan !== undefined && initialPlan !== undefined && allRequests !== null ?
                <div>
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
                                <span className={s.muted}>Si no tienes claro un título, nosotros nos encargamos de redactar el más adecuado para el artículo</span>
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
                                >
                                    <option value="true">Si</option>
                                    <option value="false" selected>No</option>
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
                        allRequests &&
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
                    }
                </div>
            :
            <LoadingDots />
        }
    </section>
    )

}

export const getServerSideProps = withAuthRequired({ redirectTo: '/iniciar-sesion' });