import Link from 'next/link';
import s from '../../../styles/css/Navbar.module.css';
import Logo from 'components/icons/Logo';
import { useUser } from 'utils/useUser';
import { useEffect, useRef } from 'react';

const Navbar = () => {
    const { user } = useUser();
    const open = useRef<HTMLImageElement | null>(null);
    const collapser = useRef<HTMLImageElement | null>(null);
    const mobileHeader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open.current && mobileHeader.current) {
            open.current.addEventListener("click", () => {
                mobileHeader.current!.classList.add(s["show"]);
            })

            collapser.current?.addEventListener("click", () => {
                mobileHeader.current!.classList.remove(s["show"]);
            })

            document.querySelectorAll("a").forEach(el => {
                el.addEventListener("click", () => {
                    mobileHeader.current!.classList.remove(s["show"]);
                })
            })
        }
    }, [])

    return (
        <header className={s.root}>
            <div className={s.header}>
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
                        <Link href="/#pricingPanel">
                            <a>Precios</a>
                        </Link>
                    {!user && (
                        <>
                            <Link href="/#stepbystep">
                                <a>¿Cómo funciona?</a>
                            </Link>
                        </>
                    )}
                    {user && user.id === "9a649806-b145-40dc-a45c-fb885fcadb41" && (
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
            <img ref={open} className={s.mobileOpen} src="/menu.svg" />
            <div className={s.mobileHeader} ref={mobileHeader}>
                <div>
                    <img ref={collapser} src="/close.svg" />
                    <Link href="/">
                        <a>Inicio</a>
                    </Link>
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
                    {user && user.id === "9a649806-b145-40dc-a45c-fb885fcadb41" && (
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
                            <>
                                <Link href="/iniciar-sesion">
                                    <a>Iniciar sesión</a>
                                </Link>
                                <Link href="/registro">
                                    <a className={s.register}>Registro</a>
                                </Link>
                            </>
                        }
                    </>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
