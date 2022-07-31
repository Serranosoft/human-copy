import Link from 'next/link';
import s from '../../../styles/css/Navbar.module.css';
import Logo from 'components/icons/Logo';
import { useUser } from 'utils/useUser';

const Navbar = () => {
    const { user } = useUser();
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
                        
                        <>                        
                            <a href="/cuenta">Mi cuenta</a>
                        </>
                       )}
                        {user && (
                        <Link href="/mis-textos">
                            <a>Mis textos</a>
                        </Link>)}
                        {!user && (
                            <>
                                <Link href="/#stepbystep">
                                    <a>¿Cómo funciona?</a>
                                </Link>
                                <Link href="/#pricingPanel">
                                    <a>Precios</a>
                                </Link>
                            </>
                        )}
                        {user && user.id === "53597006-79cf-4428-9bab-131fd11e3b43" && (
                        <Link href="/admin">
                            <a>Administración</a>
                        </Link>
                    )}

                    <>
                        {user ? 
                            <Link href="/api/auth/logout">
                                <a>Cerrar sesión</a>
                            </Link>
                         :
                        <div>
                            <Link href="/iniciar-sesion">
                                <a>Iniciar sesión</a>
                            </Link>
                            <Link href="/registro">
                                <a className={s.register}>Registro</a>
                            </Link>
                        </div>                    
                        }
                    </>
                 </nav>
            </div>
        </header>
    );
};

export default Navbar;
