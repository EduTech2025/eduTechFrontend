import '@/styles/globals.css';
import Navbar from '../components/navbar';
import Footer from '@/components/footer';
import { AuthProvider } from '@/context/AuthContext';
import ClientRoot from './clientroot/ClientRoot'; // the client wrapper

export const metadata = {
  title: 'My Site',
  description: 'A simple site with navbar layout',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Anta-Regular' }}>
        <AuthProvider>
          <ClientRoot>{children}</ClientRoot>
        </AuthProvider>
      </body>
    </html>
  );
}
