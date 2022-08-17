import LoadingBar from '@/components/ui/LoadingBar';
import Select from '@/components/ui/Select';
import { removeChildElements } from '@/utils/helpers';
import { supabase } from '@/utils/supabase-client';
import { useUser } from '@/utils/useUser';
import { Button } from '@supabase/ui';
import { read } from 'fs';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import s from '../styles/css/Admin.module.css';

export default function Account({ users }: any) {
    const [userId, setUserId] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<string>("");
    const [requests, setRequests] = useState<any>(null);
    const { userDetails } = useUser();
    const [ready, setReady] = useState(false);
    
    const uuids = useRef<HTMLSelectElement | null>(null);
    const reqIds = useRef<HTMLSelectElement | null>(null);

    // Chequear si toda la data está ready.
    useEffect(() => {
        if (users /* && uuids.current && reqIds.current */) {
            if (userDetails) {
                if (userDetails.id !== "9a649806-b145-40dc-a45c-fb885fcadb41") {
                    Router.push("/");
                } else {
                    setReady(true);
                }
            }
        }
    })

    // Carga usuarios y requests cuando toda la data está ready.
    useEffect(() => {
        if (ready) {
            console.log("Iepale.");
            fillUsers();
        }
    }, [ready])

    // Si ha escogido un usuario, se cargan los requests
    useEffect(() => {
        if (userId !== "") {
            getRequests();
        }
    }, [userId])

    // Obtiene las requests y las agrega al state
    async function getRequests() {
        await supabase.from('requests').select().eq("user_id", userId).eq("finished", false).then((requests) => {
            setRequests(requests.body);
        });
    }

    // Carga los usuarios en el selector
    function fillUsers() {
        let select = uuids.current;
        let option = document.createElement("option");
        option.textContent = `Elige un usuario`;
        select!.appendChild(option);
        users.forEach((el: { full_name: any; id: string; }) => {
            let option = document.createElement("option");
            option.textContent = `${el.full_name} con el ID: ${el.id}`;
            option.value = el.id;
            select!.appendChild(option);
        })
    }

    useEffect(() => {
        if (requests && requests.length > 0) {
            fillRequests();
        }
    }, [requests])

    // Carga las requests del usuario que ha escogido
    function fillRequests() {
        let select = reqIds.current;
        let option = document.createElement("option");
        option.textContent = `Elige una petición`;
        select!.appendChild(option);
        requests.forEach((el: { title: any; id: string; user_id: string }) => {
            let option = document.createElement("option");
            option.textContent = `Petición: ${el.title} para el usuario: ${el.user_id}`;
            option.value = el.id;
            select!.appendChild(option);
        })
    }

    // Agrega el usuario escogido al state y limpia el selector de requests
    function setSelectedUser(e: any) {
        removeChildElements(reqIds.current!);
        setUserId(e.target.value);
    }

    // Agrega la requests elegida al state
    function setSelectedReq(e: any) {
        setSelectedRequest(e.target.value);
    }

    // Función encargada de actualizar la request con el PDF y en estado finalizado
    async function onSubmit(e: any) {
        e.preventDefault();
        let inputs = document.querySelectorAll("input[name='file']")! as NodeList;

        inputs.forEach((input: any) => {
            let file = input!.files![0];
            let blob: string | ArrayBuffer | null = null;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async function () {
                blob = reader.result;
                if (blob) {
                    const { data, error } = await supabase.from('requests').update(
                        [{ [input.dataset.type]: blob, finished: true }])
                        .match({ id: selectedRequest });
                    if (!error) {
                        alert("El artículo se ha subido correctamente");
                    } else {
                        alert("Ha ocurrido un error")
                    }
                }
            }
        })

    }

    return (
        <>
            {!ready ?
            <LoadingBar />
            :
            <section className={s.root}>
                <form onSubmit={onSubmit}>
                    <Select
                        ref={uuids}
                        onChange={setSelectedUser}>
                    </Select>
                    <Select
                        ref={reqIds}
                        onChange={setSelectedReq} 
                        disabled={requests === null || requests.length < 1 ? true : false}>
                    </Select>
                    <div className={s.uploadDiv}>
                        <div>
                            <p>Subir artículo en formato Word</p>
                            <input data-type="download_word" name="file" type="file" />
                        </div>
                        <div>
                            <p>Subir artículo en formato ODT</p>
                            <input data-type="download_odt" name="file" type="file" />
                        </div>
                        <div>
                            <p>Subir artículo en formato PDF</p>
                            <input data-type="download_pdf" name="file" type="file" />
                        </div>
                    </div>
                    <Button>Enviar</Button>
                </form>
            </section>
        }
        </>
    )

}


export async function getServerSideProps() {
    const data = await supabase.from('users').select();
    const users = data.body;
    return {
        props: { users }
    }
}