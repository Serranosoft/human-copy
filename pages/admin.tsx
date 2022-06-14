import { supabase } from '@/utils/supabase-client';
import { useEffect, useState } from 'react';

export default function Account({data}: any) {
    console.log(data);
    const [userId, setUserId] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [requests, setRequests] = useState<any>(null);

    async function onSubmit(e: any) {
        e.preventDefault();
        let input = document.getElementById("pdf-file")! as HTMLInputElement;
        var file = input!.files![0];
        let blob: string | ArrayBuffer | null = null;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
            blob = reader.result;
            if (blob) {
                /* const { data, error } = await supabase.from('requests').insert(
                    [{ id: Date.now(), user_id: user, download: blob }], {
                    returning: 'minimal',
                }); */
                const { data, error } = await supabase.from('requests').update(
                    [{ download: blob, finished: true }])
                    .match({id: selectedRequest.id});
                if (!error) {
                    alert("El PDF se ha subido correctamente");
                } else {
                    alert("Ha ocurrido un error")
                }
            }
        }
    }

    // Carga los usuarios cuando recibe el objeto users
    useEffect(() => {
        let select = document.getElementById("upload-file-uuids")! as HTMLSelectElement;
        data.users.forEach((el: { full_name: any; id: string; }) => {
            let option = document.createElement("option");
            option.textContent = `${el.full_name} con el ID: ${el.id}`;
            option.value = el.id;
            select.appendChild(option);
        })
    }, [data.users])

    useEffect(() => {
        if (userId) {
            getRequests();
        }
    }, [userId])

    async function getRequests() {
        await supabase.from('requests').select().eq("user_id", userId).then((requests) => {
            setRequests(requests.body)
        });
    }

    useEffect(() => {
        if (requests) {
            let select = document.getElementById("upload-file-req-ids")! as HTMLSelectElement;
            select.innerHTML = "";
            requests.forEach((el: { title: any; id: string; user_id: string }) => {
                let option = document.createElement("option");
                option.textContent = `Petición: ${el.title} para el usuario: ${el.user_id}`;
                option.value = el.id;
                select.appendChild(option);
            })
        }
    }, [requests])

    function setSelectedUser(e: any) {
        setUserId(e.target.value);
    }

    function setSelectedReq(e: any) {
        setSelectedRequest(e.target.value);
    }

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
    const users = await supabase.from('users').select();
    // const requests = await supabase.from('requests').select();

    const data = {
        users: users.body,
        // requests: requests.body
    }
    // const data = res;
    return {
        props : {data}
    }
}