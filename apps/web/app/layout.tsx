import './globals.css';
import { ReactNode } from 'react';
import AuthProvider from './AuthProvider'; 
import  Layout  from '@repo/ui/Layout';

export const metadata = {
  title: 'MyStore',
  description: 'Your one-stop shop for all your needs!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
