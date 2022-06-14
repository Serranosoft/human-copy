import { supabase } from '@/utils/supabase-client';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import { User } from '@supabase/supabase-auth-helpers/react';
import { useEffect, useState } from 'react';

export interface Request {
    finished: boolean | undefined;
    title: string | undefined;
    download: string | undefined;
}

export default function Texts({ user }: { user: User }) {
    const initialValue: Request[] = [
        {
            finished: false,
            title: "Cargando...",
            download: "/"
        }
    ]

    const [text, setTexts] = useState<Request[]>(initialValue);
    const [req, setReq] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        getReq();
    }, [user])


    async function getReq() {
        const { data, error }: { data: any; error: any } = await supabase.from('requests').select('finished, download').eq("user_id", user.id);
        setTexts(data);
    }

    async function submitReq(e: any) {
        e.preventDefault();
        const { data, error }: { data: any; error: any } = await supabase.from('requests').insert([{
            id: Date.now(),
            user_id: user.id,
            title: req.title,
            description: req.description,
            finished: false
        }]);
        console.log(data);
        console.log(error);
        getReq();
    }

    function handleChange(evt: any) {
        const value = evt.target.value;
        console.log(value);
        setReq({
            ...req,
            [evt.target.name]: value
        });
    }

    return (
        <>
            <div>
                <form onSubmit={submitReq}>
                    <input type="text" placeholder="Título del artículo" name="title" onChange={handleChange} />
                    <input type="text" placeholder="Descripción del artículo" name="description" onChange={handleChange} />
                    <input type="submit" />
                </form>
            </div>
            <div>
                {
                    text && text.map(pdf => {
                        return (
                            <a download={pdf.title !== null ? pdf.title : "PDF"} href={pdf.download} title='Descargar PDF'>Descargar {pdf.title !== null ? pdf.title : "PDF sin nombre (Ponte en contacto con soporte@dominio.com"}</a>
                        )
                    })
                }
            </div>
        </>
    )

}

export const getServerSideProps = withAuthRequired({ redirectTo: '/signin' });