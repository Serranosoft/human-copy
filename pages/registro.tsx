import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { updateEmail, updateUserName } from 'utils/supabase-client';
import { User } from '@supabase/gotrue-js';

export interface UserData {
    email: string;
    password: string;
    name: string;
}

const Registro = () => {

    const initialValue: UserData = {
        email: "",
        password: "",
        name: "",
    }

    const [newUser, setNewUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | any>(initialValue);
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type?: string; content?: string }>({
        type: '',
        content: ''
    });
    const router = useRouter();
    const { user } = useUser();

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage({});

        const {email, password, name} = userData;
        const { error, user: createdUser } = await supabaseClient.auth.signUp({
            email,
            password
        });
        if (error) {
            setMessage({ type: 'error', content: error.message });
        } else {
            if (createdUser) {
                await updateUserName(createdUser, name);
                await updateEmail(createdUser, userData.email);
                setNewUser(createdUser);
            } else {
                setMessage({
                    type: 'note',
                    content: 'Check your email for the confirmation link.'
                });
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (newUser || user) {
            router.replace('/cuenta');
        }
    }, [newUser, user]);

    function handleChange(e: any) {
        const value = e.target.value;
        setUserData({
            ...userData,
            [e.target.name]: value
        });
    }

    return (
        <div>
            <div>
                <p>Crear una cuenta</p>
                {message.content && (
                    <span
                       /*  className={`${message.type === 'error' ? 'text-pink-500' : 'text-green-500'
                            } border ${message.type === 'error'
                                ? 'border-pink-500'
                                : 'border-green-500'
                            } p-3`} */
                    >
                        {message.content === "Invalid login credentials" ? "Correo electrónico o contraseña incorrecta" : message.content}
                    </span>
                )}
                <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        // value={email}
                        onChange={handleChange}
                        name="email"
                        required
                    />
                    <Input
                        type="name"
                        placeholder="Nombre / Agencia"
                        // value={name}
                        onChange={handleChange}
                        name="name"
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        // value={password}
                        onChange={handleChange}
                        name="password"
                        required
                    />
                    <Button
                        type="submit"
                        loading={loading}
                        disabled={!userData.password.length || !userData.email.length}
                    >
                        Registro
                    </Button>
                </form>
            </div>
            {/* <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
                <div className="flex justify-center pb-12 ">
                    <Logo width="64px" height="64px" />
                </div>
                <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                    {message.content && (
                        <div
                            className={`${message.type === 'error' ? 'text-pink-500' : 'text-green-500'
                                } border ${message.type === 'error'
                                    ? 'border-pink-500'
                                    : 'border-green-500'
                                } p-3`}
                        >
                            {message.content}
                        </div>
                    )}
                    <Input placeholder="Nombre / Agencia" onChange={setName} />
                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        onChange={setEmail}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        onChange={setPassword}
                    />
                    <div className="pt-2 w-full flex flex-col">
                        <Button
                            type="submit"
                            loading={loading}
                            // disabled={loading || !email.length || !password.length}
                        >
                            Registrate
                        </Button>
                    </div>

                    <span className="pt-1 text-center text-sm">
                        <span className="text-zinc-200">¿Tienes una cuenta?</span>
                        {` `}
                        <Link href="/iniciar-sesion">
                            <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                                Inicia sesión.
                            </a>
                        </Link>
                    </span>
                </form>
            </div> */}
        </div>
    );
};

export default Registro;
