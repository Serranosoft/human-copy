import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import LoadingDots from 'components/ui/LoadingDots';
import Logo from 'components/icons/Logo';
import { getURL } from '@/utils/helpers';
import s from '../styles/css/Iniciar-sesion.module.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type?: string; content?: string }>({
        type: '',
        content: ''
    });
    const router = useRouter();
    const { user } = useUser();

    const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage({});

        const { error } = await supabaseClient.auth.signIn(
            { email, password },
            { redirectTo: getURL() }
        );
        if (error) {
            setMessage({ type: 'error', content: error.message });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (user) {
            router.replace('/account');
        }
    }, [user]);

    if (!user)
        return (
            <div className={s.root}>
                <div>
                    <p>Iniciar sesión</p>
                    {message.content && (
                        <span
                            className={`${message.type === 'error' ? 'text-pink-500' : 'text-green-500'
                                } border ${message.type === 'error'
                                    ? 'border-pink-500'
                                    : 'border-green-500'
                                } p-3`}
                        >
                            {message.content === "Invalid login credentials" ? "Correo electrónico o contraseña incorrecta" : message.content}
                        </span>
                    )}
                    <form onSubmit={handleSignin} className="flex flex-col space-y-4">
                        <Input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={setEmail}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={setPassword}
                            required
                        />
                        <Button
                            className="mt-1"
                            type="submit"
                            loading={loading}
                            disabled={!password.length || !email.length}
                        >
                            Iniciar sesión
                        </Button>
                    </form>
                </div>
                {/* <div>
                <div>
                    <Logo width="64px" height="64px" />
                </div>
                <div className="flex flex-col space-y-4">
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

                    <form onSubmit={handleSignin} className="flex flex-col space-y-4">
                        <Input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={setEmail}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={setPassword}
                            required
                        />
                        <Button
                            className="mt-1"
                            type="submit"
                            loading={loading}
                            disabled={!password.length || !email.length}
                        >
                            Iniciar sesión
                        </Button>
                    </form>

                    <span className="pt-1 text-center text-sm">
                        <span className="text-zinc-200">¿No tienes una cuenta?</span>
                        {` `}
                        <Link href="/signup">
                            <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                                Registrate.
                            </a>
                        </Link>
                    </span>
                </div>
            </div> */}
            </div>
        );

    return (
        <div className="m-6">
            <LoadingDots />
        </div>
    );
};

export default SignIn;
