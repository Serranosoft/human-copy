import { supabase } from '@/utils/supabase-client';

export default function Account() {

    async function onSubmit() {
        const fr = new FileReader();
        let input = document.getElementById("pdf-file") as HTMLInputElement;
        const file = input.files![0];
        fr.readAsArrayBuffer(file)
        let blob = new Blob(["lol"]);
        fr.onload = function () {
            // you can keep blob or save blob to another position
            blob = new Blob([fr.result!])
        }
        console.log(blob);
        const { data, error } = await supabase
            .from('textos')
            .insert([
                { ["user-id"]: '123456789', text: blob }
            ]).single();

        console.log(data);
        console.log(error);
    }

    return (
        <>
            <p>holaS</p>
            <form onSubmit={onSubmit}>
                <input id="pdf-file" type="file" />
                <input type="submit" value="Enviar" />
            </form>
        </>
    )

}