import Link from 'next/link';
import s from '../../../styles/css/Footer.module.css';
import Logo from 'components/icons/Logo';

export default function Footer() {
  return (
    <footer className={s.root}>
      <div>
        <div>
          <Link href="/">
            <a>
              <span>
                <Logo />
              </span>
              <span>ACME</span>
            </a>
          </Link>
        </div>
        <div>
          <ul>
            <li>
              <Link href="/">
                <a>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  Careers
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  Blog
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <p>
                LEGAL
              </p>
            </li>
            <li>
              <Link href="/">
                <a>
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  Terms of Use
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <span>&copy; 2020 ACME, Inc. All rights reserved.</span>
        </div>
        <div>
          <span>Crafted by</span>
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
