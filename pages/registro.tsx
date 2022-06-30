import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
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
                    <span>
                        {message.content === "Invalid login credentials" ? "Correo electrónico o contraseña incorrecta" : message.content}
                    </span>
                )}
                <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        onChange={handleChange}
                        name="email"
                        required
                    />
                    <Input
                        type="name"
                        placeholder="Nombre / Agencia"
                        onChange={handleChange}
                        name="name"
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
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
        </div>
    );
};

export default Registro;
