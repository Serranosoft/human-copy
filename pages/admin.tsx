import LoadingBar from '@/components/ui/LoadingBar';
import Select from '@/components/ui/Select';
import { removeChildElements } from '@/utils/helpers';
import { supabase } from '@/utils/supabase-client';
import { useUser } from '@/utils/useUser';
import { Button } from '@supabase/ui';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import s from '../styles/css/Admin.module.css';

export default function Account({ users }: any) {
    const [userId, setUserId] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<string>("");
    const [requests, setRequests] = useState<any>(null);
    const { userDetails } = useUser();
    const [initialData, setInitialData] = useState(false);
    
    const uploadFileUuids = useRef<HTMLSelectElement | null>(null);
    const uploadFileReqIds = useRef<HTMLSelectElement | null>(null);

    // Si el usuario no es administrador, echarlo a la home.
    useEffect(() => {
        if (userDetails) {
            if (userDetails.id !== "9a649806-b145-40dc-a45c-fb885fcadb41") {
                Router.push("/");
            }
        }
    }, [userDetails])

    // Chequear si toda la data está ready.
    useEffect(() => {
        if (users && uploadFileUuids.current && uploadFileReqIds.current) {
            setInitialData(true);
        }
    })

    // Carga usuarios y requests cuando toda la data está ready.
    useEffect(() => {
        if (initialData) {
            fillUsers();
        }
    }, [initialData])

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
        let select = uploadFileUuids.current;
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
        let select = uploadFileReqIds.current;
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
        removeChildElements(uploadFileReqIds.current!);
        setUserId(e.target.value);
    }

    // Agrega la requests elegida al state
    function setSelectedReq(e: any) {
        setSelectedRequest(e.target.value);
    }

    // Función encargada de actualizar la request con el PDF y en estado finalizado
    async function onSubmit(e: any) {
        e.preventDefault();
        let input = document.getElementById("pdf-file")! as HTMLInputElement;
        let file = input!.files![0];
        let blob: string | ArrayBuffer | null = null;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
            blob = reader.result;
            if (blob) {
                const { data, error } = await supabase.from('requests').update(
                    [{ download: blob, finished: true }])
                    .match({ id: selectedRequest });
                if (!error) {
                    alert("El PDF se ha subido correctamente");
                } else {
                    alert("Ha ocurrido un error")
                }
            }
        }
    }

    return (
        <>
            {userDetails === null || userDetails.id !== "9eb85418-49fa-4646-835f-1dfdd349f98c" && !initialData ?
            <LoadingBar />
            :
            <section className={s.root}>
                <form onSubmit={onSubmit}>
                    <Select
                        ref={uploadFileUuids}
                        onChange={setSelectedUser} 
                        id="upload-file-uuids"
                    >
                    </Select>
                    <Select
                        ref={uploadFileReqIds}
                        onChange={setSelectedReq} 
                        id="upload-file-req-ids"
                        disabled={requests === null || requests.length < 1 ? true : false}
                    >
                    </Select>
                    
                    <input id="pdf-file" type="file" />
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