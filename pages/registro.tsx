import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { User } from '@supabase/gotrue-js';
import s from '../styles/css/login-register.module.css';
import GoogleButton from '@/components/ui/Google/GoogleButton';
import Link from 'next/link';
import { updateUserName } from '@/utils/supabase-client';

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
                updateUserName(createdUser, name);
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
            router.replace('/');
        }
    }, [newUser, user]);

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

    return (
        <div className={s.root}>
                <div className={s.credentials}>
                    <p>Crear una cuenta</p>
                    {message.content && (
                        <span>
                            {message.content === "Invalid login credentials" ? "Correo electrónico o contraseña incorrecta" : message.content}
                        </span>
                    )}
                    <form onSubmit={handleSignup}>
                        <div>
                            <label>Correo electrónico</label>
                            <Input
                                type="email"
                                onChange={handleChange}
                                name="email"
                                required
                             />
                        </div>
                        <div>
                            <label>Nombre</label>
                            <Input
                                type="name"
                                onChange={handleChange}
                                name="name"
                                required
                            />
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <Input
                                type="password"
                                onChange={handleChange}
                                name="password"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            loading={loading}
                            disabled={!userData.password.length || !userData.email.length}
                        >
                            Crear cuenta
                        </Button>
                    </form>
                </div>
                <div className={s.googleWrapper}>
                    <span>Otros métodos para iniciar sesión</span>
                    <div>
                        <span className={s.separator}></span>
                        <GoogleButton onClick={signInWithGoogle} />
                        <span className={s.separator}></span>
                    </div>
                    <span>o</span>
                    <div>
                        <span className={s.separator}></span>
                        <Link href="/iniciar-sesion"><a>Iniciar sesión con email</a></Link>
                        <span className={s.separator}></span>
                    </div>
                </div>
            </div>
    );
};

export default Registro;
