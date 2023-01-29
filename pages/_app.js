// Import required dependencies.
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';

// Import global styles.
import './global.css';
import Footer from '/components/Footer';
import Header from '/components/Header';

// Create constant for the custom font being used.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="mcc, minnesota computer club, mn computer club, computer club mn" />
        <meta name="author" content="Minnesota Computer Club" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <ThemeProvider enableSystem={true} attribute="class">
        <Header className={`${inter.variable} font-sans`} />

        <main className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </main>

        <Footer className={`${inter.variable} font-sans`} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;