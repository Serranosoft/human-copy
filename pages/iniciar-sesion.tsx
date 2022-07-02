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
import s from '../styles/css/login-register.module.css';
import { updateEmail, updatePlan, updateUserName } from '@/utils/supabase-client';
import GoogleButton from '@/components/ui/Google/GoogleButton';
import LoadingBar from '@/components/ui/LoadingBar';

export interface UserData {
    email: string;
    password: string;
}

const SignIn = () => {

    const initialValue: UserData = {
        email: "",
        password: "",
    }
    
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
            router.replace('/');
        }
    }, [user]);

    function handleChange(e: any) {
        const value = e.target.value;
        setUserData({
            ...userData,
            [e.target.name]: value
        });
    }

    async function signInWithGoogle() {
        await supabaseClient.auth.signIn({
            provider: 'google',
        })
    }


    if (!user)
        return (
            <div className={s.root}>
                <div className={s.credentials}>
                    <p>Iniciar sesión</p>
                    {message.content && (
                        <span>
                            {message.content === "Invalid login credentials" ? "Correo electrónico o contraseña incorrecta" : message.content}
                        </span>
                    )}
                    <form onSubmit={handleSignin}>
                        <div>
                            <label>Correo electrónico</label>
                            <Input
                                type="email"
                                // placeholder="Correo electrónico"
                                onChange={handleChange}
                                name="email"
                                required
                            />
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <Input
                                type="password"
                                // placeholder="Contraseña"
                                onChange={handleChange}
                                name="password"
                                required
                            />
                        </div>
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
                <div className={s.googleWrapper}>
                    <span>Puedes iniciar sesión con Google.</span>
                    <div>
                        <span className={s.separator}></span>
                        <GoogleButton onClick={signInWithGoogle} />
                        <span className={s.separator}></span>
                    </div>
                    <span>o</span>
                    <div>
                        <span className={s.separator}></span>
                        <Link href="/registro"><a>Registrarte</a></Link>
                        <span className={s.separator}></span>
                    </div>
                </div>
            </div>
        );

    return (
        <div>
            <LoadingBar />
        </div>
    );
};

export default SignIn;
