import '@/styles/globals.css';
import Navbar from '../components/navbar';
import Footer from '@/components/footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'My Site',
  description: 'A simple site with navbar layout',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider> 
          <body>
            <Navbar />
            <main className="p-4">{children}</main>
            <Footer />
          </body>
      </AuthProvider>
    </html>
  );
}

// ssh -R 80:localhost:3000 serveo.net
// git config --global user.name Himanshu-Deve