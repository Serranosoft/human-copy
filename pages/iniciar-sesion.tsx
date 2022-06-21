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

export interface UserData {
    email: string;
    password: string;
}

const SignIn = () => {

    const initialValue: UserData = {
        email: "",
        password: "",
    }

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [userData, setUserData] = useState<UserData | any>(initialValue);
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
        const { email, password } = userData;
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
            router.replace('/cuenta');
        }
    }, [user]);

    function handleChange(e: any) {
        const value = e.target.value;
        setUserData({
            ...userData,
            [e.target.name]: value
        });
    }

    if (!user)
        return (
            <div className={s.root}>
                <div>
                    <p>Iniciar sesión</p>
                    {message.content && (
                        <span
                            /* className={`${message.type === 'error' ? 'text-pink-500' : 'text-green-500'
                                } border ${message.type === 'error'
                                    ? 'border-pink-500'
                                    : 'border-green-500'
                                } p-3`} */
                        >
                            {message.content === "Invalid login credentials" ? "Correo electrónico o contraseña incorrecta" : message.content}
                        </span>
                    )}
                    <form onSubmit={handleSignin}>
                        <Input
                            type="email"
                            placeholder="Correo electrónico"
                            // value={email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            // value={password}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            className="mt-1"
                            type="submit"
                            loading={loading}
                            disabled={!userData.password.length || !userData.email.length}
                        >
                            Iniciar sesión
                        </Button>
                    </form>
                </div>
            </div>
        );

    return (
        <div>
            <LoadingDots />
        </div>
    );
};

export default SignIn;
