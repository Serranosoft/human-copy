import { removeChildElements } from '@/utils/helpers';
import { supabase } from '@/utils/supabase-client';
import { useEffect, useState } from 'react';

export default function Account({ users }: any) {
    const [userId, setUserId] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [requests, setRequests] = useState<any>(null);

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
                console.log(selectedRequest.id);
                const { data, error } = await supabase.from('requests').update(
                    [{ download: blob, finished: true }])
                    .match({ id: selectedRequest.id });
                if (!error) {
                    alert("El PDF se ha subido correctamente");
                } else {
                    alert("Ha ocurrido un error")
                }
            }
        }
    }

    // Agrega el usuario escogido al state y limpia el selector de requests
    function setSelectedUser(e: any) {
        removeChildElements(document.getElementById("upload-file-req-ids")!);
        setUserId(e.target.value);
    }

    // Agrega la requests elegida al state
    function setSelectedReq(e: any) {
        setSelectedRequest(e.target.value);
    }

    // Obtiene las requests y las agrega al state
    async function getRequests() {
        await supabase.from('requests').select().eq("user_id", userId).eq("finished", false).then((requests) => {
            setRequests(requests.body)
        });
    }

    // Carga los usuarios cuando recibe el objeto users
    useEffect(() => {
        let select = document.getElementById("upload-file-uuids")! as HTMLSelectElement;
        users.forEach((el: { full_name: any; id: string; }) => {
            let option = document.createElement("option");
            option.textContent = `${el.full_name} con el ID: ${el.id}`;
            option.value = el.id;
            select.appendChild(option);
        })
    }, [users])

    // Si ha escogido un usuario, se cargan los requests
    useEffect(() => {
        if (userId) {
            getRequests();
        }
    }, [userId])

    // Cuando los requests se han cargado y son mas de 0, se muestran en el selector
    useEffect(() => {
        if (requests && requests.length > 0) {
            let select = document.getElementById("upload-file-req-ids")! as HTMLSelectElement;
            let option = document.createElement("option");
            option.textContent = `Elige un usuario`;
            select.appendChild(option);
            requests.forEach((el: { title: any; id: string; user_id: string }) => {
                let option = document.createElement("option");
                option.textContent = `Petición: ${el.title} para el usuario: ${el.user_id}`;
                option.value = el.id;
                select.appendChild(option);
            })
        }
    }, [requests])

    return (
        <>
            <form onSubmit={onSubmit}>
                <select onChange={setSelectedUser} id="upload-file-uuids">
                    <option>Elige un usuario</option>
                </select>
                <select onChange={setSelectedReq} id="upload-file-req-ids">
                    <option>Elige un usuario</option>
                </select>
                <input id="pdf-file" type="file" />
                <input type="submit" value="Enviar" />
            </form>
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