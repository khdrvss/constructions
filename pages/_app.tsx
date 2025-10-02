import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

type Theme = 'light' | 'dark';

type ExtendedComponent = AppProps['Component'] & ComponentType<{ theme: Theme; setTheme: (theme: Theme) => void }>;

type ExtendedAppProps = AppProps & {
  Component: ExtendedComponent;
};

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} theme={theme} setTheme={setTheme} />
    </>
  );
}

export default MyApp;
