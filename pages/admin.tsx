import { supabase } from '@/utils/supabase-client';
import { useEffect, useState } from 'react';

export default function Account() {

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
                    [{ id: Date.now().toString(), user_id: '123456789', text: blob }], {
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

        const fetchData = async () => {
            const { data, error } = await supabase.from('users').select();
            return data;
        }

        fetchData().then(res => {
            let select = document.getElementById("upload-file-uuids")! as HTMLSelectElement;
            res?.forEach(el => {
                let option = document.createElement("option");
                option.textContent = `${el.full_name} con el ID: ${el.id}`;
                option.value = `${el.full_name} con el ID: ${el.id}`;
                select.appendChild(option);
            })
        });
        
        
    }, [])

    return (
        <>
            <form onSubmit={(e) => onSubmit(e)}>
                <select id="upload-file-uuids">
                    <option>Default</option>
                </select>
                <input id="pdf-file" type="file" />
                <input type="submit" value="Enviar" />
            </form>
        </>
    )

}