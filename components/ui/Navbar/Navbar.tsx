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
    <nav className={s.root}>
      <a href="#skip">
        Skip to content
      </a>
      <div>
        <div>
          <div>
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav>
              <Link href="/">
                <a className={s.link}>Pricing</a>
              </Link>
              <Link href="/account">
                <a className={s.link}>Account</a>
              </Link>
            </nav>
          </div>

          <div>
            {user ? (
              <Link href="/api/auth/logout">
                <a className={s.link}>Sign out</a>
              </Link>
            ) : (
              <Link href="/signin">
                <a className={s.link}>Sign in</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
