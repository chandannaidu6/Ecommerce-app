import './globals.css';
import { ReactNode } from 'react';
import AuthProvider from './AuthProvider'; 
import  Layout  from '@repo/ui/Layout';
import { CartProvider } from '../contexts/cartContext';

export const metadata = {
  title: 'MyStore',
  description: 'Your one-stop shop for all your needs!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
          <Layout>{children}</Layout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
