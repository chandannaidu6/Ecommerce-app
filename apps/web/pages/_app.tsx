import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import {Layout} from '@repo/ui'
interface CustomPageProps {
  session?: Session;
  [key: string]: any;
}

function MyApp(
  { Component, pageProps: { session, ...pageProps } }: AppProps<CustomPageProps>
) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
