import Link from 'next/link';
import s from '../../../styles/css/Navbar.module.css';
import Logo from 'components/icons/Logo';
import { useUser } from 'utils/useUser';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useRouter } from 'next/router';

const Navbar = () => {
    const { user } = useUser();
    const router = useRouter();
    return (
        <header className={s.root}>
            <div>
                <div>
                    <Link href="/">
                        <a className={s.logo} aria-label="Logo">
                            <Logo />
                        </a>
                    </Link>
                </div>
                <nav>
                    {user && (
                        <Link href="/cuenta">
                            <a className={s.link}>Mi cuenta</a>
                        </Link>)}
                        {user && (
                        <Link href="/mis-textos">
                            <a className={s.link}>Mis textos</a>
                        </Link>)}
                        {!user && (
                            <Link href="/">
                                <a className={s.link}>Precios</a>
                            </Link>
                        )}
                        {user && user.id === "53597006-79cf-4428-9bab-131fd11e3b43" && (
                        <Link href="/admin">
                            <a className={s.link}>Administración</a>
                        </Link>
                    )}
                    <span>
                        {user ? (
                            <Link href="/api/auth/logout">
                                <a className={s.link}>Cerrar sesión</a>
                            </Link>
                        ) : (
                            <Link href="/iniciar-sesion">
                                <a className={s.link}>Iniciar sesión</a>
                            </Link>
                        )}
                    </span>
                 </nav>
            </div>
        </header>
    );
};

export default Navbar;
