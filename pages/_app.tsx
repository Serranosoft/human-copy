import 'styles/variables.css';
import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect } from 'react';
import React from 'react';

import Layout from 'components/Layout';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import ScrollObserver from "../utils/scroll-observer"

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        document.body.classList?.remove('loading');
    }, []);

    return (
        <UserProvider supabaseClient={supabaseClient}>
            <MyUserContextProvider supabaseClient={supabaseClient}>
                <ScrollObserver>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ScrollObserver>
            </MyUserContextProvider>
        </UserProvider>
    );
}
