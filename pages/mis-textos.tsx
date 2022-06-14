import { supabase } from '@/utils/supabase-client';
import { useEffect } from 'react';

export default function Account() {

    useEffect(() => {
        getTexts();
    }, [])

    async function getTexts() {
        const { data, error } = await supabase.from('textos').select();

        console.log(data);
    }

    return (
        <>
            <div>
                <p></p>
            </div>
        </>
    )

}