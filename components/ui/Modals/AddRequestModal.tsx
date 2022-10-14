import { clearErrors, setError } from "@/utils/helpers";
import { supabase } from "@/utils/supabase-client";
import { User } from "@supabase/supabase-auth-helpers/react";
import { useState } from "react"
import Button from "../Button";
import Input from "../Input";
import Select from "../Select"
import Modal from "./Modal"
import s from '@/styles/css/AddRequestModal.module.css';

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

export default function AddRequestModal(
    {user, show, setModalState, getReq, getPlan, initialPlan, setInitialPlan}:

    {user: User, 
    show: boolean,
    setModalState:
    Function,
    getReq: Function,
    getPlan: Function,
    initialPlan: number,
    setInitialPlan: Function}) {

    // Objeto con datos iniciales para cargar en las requests
    const initialValue: Request = {
        id: "",
        finished: false,
        title: "",
        topic: "",
        description: "",
        download_pdf: "/",
        download_odt: "/",
        download_word: "/",
        words: "0",
        priority: false
    }

    const [request, setRequest] = useState<Request>(initialValue);
    const [range, applyRange] = useState<number>(0);
    const [plan, setPlan] = useState<number>();


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

            const { data, error } = await supabase.from('requests').insert([{
                id: Date.now(),
                user_id: user.id,
                title: request.title !== "" ? request.title : "HumanCopy redactará un título para este artículo",
                topic: request.topic,
                description: request.description,
                finished: false,
                words: request.words,
                priority: request.priority
            }]);

            
            if (!error) {
                await supabase.from("users").update([{
                    plan: plan
                }]).match({ id: user.id }).single().then(({ data, error }) => {
                    if (!data || error) {
                        // setErrorModal(true);
                        // setErrorMsg("Ha ocurrido un error al actualizar tu plan. Ponte en contacto con nosotros.")
                    } else {
                        setInitialPlan(data.plan)
                    }
                });
                setModalState(false)
                getReq();
                getPlan();
                // Reiniciar valores del modal
                setRequest(initialValue);
                applyRange(0);
            } else {
                // setErrorModal(true);
                // setErrorMsg("Ha ocurrido un error al envíar el artículo. Ponte en contacto con nosotros.")
            }
        }

    }

    function onClose() {
        setPlan(initialPlan);
        applyRange(0);
    }


    return (
        <Modal show={show} setModalState={setModalState} onCloseCallback={onClose}>
            <div className={s.root}>
                <form>
                    <span>Palabras disponibles: {initialPlan === -1 ? "Ilimitado" : plan}</span>
                    <div>
                        <label>Título del artículo (h1)</label>
                        <Input name="title" onChange={handleChange}></Input>
                        <span className={s.muted}>Si no tienes claro un título, nosotros nos encargamos de redactar el más adecuado para el artículo</span>
                    </div>
                    <div>
                        <label>Cantidad de palabras en el artículo</label>
                        <span>{range} palabras</span>
                        <input
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
                        <span></span>
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
                        <span>Si eliges 'Si', tendrémos en cuenta que el artículo es prioritario y será de los primeros textos en escribirse.</span>
                    </div>
                </form>
                <div>
                    <Button type="submit" onClick={submitReq}>Enviar artículo</Button>
                </div>
            </div>
        </Modal>
    )
}