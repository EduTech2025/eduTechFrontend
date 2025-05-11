import '@/styles/globals.css';
import Navbar from '../components/navbar';
import Footer from '@/components/footer';

export const metadata = {
  title: 'My Site',
  description: 'A simple site with navbar layout',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}

// ssh -R 80:localhost:3000 serveo.net
// git config --global user.name Himanshu-Deve