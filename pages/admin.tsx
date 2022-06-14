import { supabase } from '@/utils/supabase-client';
import { useEffect, useState } from 'react';

export default function Account({data}: any) {

    const [user, setUser] = useState(null);

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
                const { data, error } = await supabase.from('textos').insert(
                    [{ id: Date.now().toString(), user_id: user, text: blob }], {
                    returning: 'minimal',
                });
                if (!error) {
                    alert("El PDF se ha subido correctamente");
                } else {
                    alert("Ha ocurrido un error")
                }
            }
        }
    }


    useEffect(() => {
        let select = document.getElementById("upload-file-uuids")! as HTMLSelectElement;
        data.forEach((el: { full_name: any; id: string; }) => {
            let option = document.createElement("option");
            option.textContent = `${el.full_name} con el ID: ${el.id}`;
            option.value = el.id;
            select.appendChild(option);
        })
    }, [data])

    function setSelectedUser(e: any) {
        setUser(e.target.value);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <select onChange={setSelectedUser} id="upload-file-uuids">
                    <option>Default</option>
                </select>
                <input id="pdf-file" type="file" />
                <input type="submit" value="Enviar" />
            </form>
        </>
    )

}


export async function getServerSideProps() {
    const res = await supabase.from('users').select();
    const data = res.body;
    return {
        props : {data}
    }
}