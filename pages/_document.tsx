import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital@0;1&display=swap" rel="stylesheet" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    {<script dangerouslySetInnerHTML={{
                        __html: `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-MKX6HQT');</script>`
                    }}></script>}
                </Head>
                <body>
                    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MKX6HQT"
                        height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
