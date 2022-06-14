import { supabase } from '@/utils/supabase-client';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import { User } from '@supabase/supabase-auth-helpers/react';
import { useEffect, useState } from 'react';

export interface Text {
    text_title: string | undefined;
    text: string | undefined;
}

export default function Texts({ user }: { user: User }) {
    const initialValue: Text[] = [
        {
            text_title: "Cargando...",
            text: "/"
        }
    ]

    const [text, setTexts] = useState<Text[]>(initialValue);

    useEffect(() => {
        getTexts();
    }, [user])


    async function getTexts() {
        const {data, error}: {data: any; error: any} = await supabase.from('textos').select('text, text_title').eq("user_id", user.id);
        setTexts(data);
    }

    return (
        <>
            <div>
                {
                    text && text.map(pdf => {
                        console.log(pdf.text_title);
                        return (
                            <a download={pdf.text_title !== null ? pdf.text_title : "PDF"} href={pdf.text} title='Descargar PDF'>Descargar {pdf.text_title !== null ? pdf.text_title : "PDF sin nombre (Ponte en contacto con soporte@dominio.com"}</a>
                        )
                    })
                }
            </div>
        </>
    )

}

export const getServerSideProps = withAuthRequired({ redirectTo: '/signin' });