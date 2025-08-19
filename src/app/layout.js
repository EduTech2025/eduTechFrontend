import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import ClientRoot from './clientroot/ClientRoot'; // the client wrapper
import GrokStarBackground from '@/utils/ParticleBackground';
import ClickSpark from "@/utils/cursor_tap";

export const metadata = {
  title: 'De Silent Order',
  description: 'A simple site with navbar layout',
  icons: {
    icon: "/favicon.ico",       
    shortcut: "/favicon.ico",   
    apple: "/favicon.ico", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Anta-Regular',background: 'black' }}>
           <ClickSpark
              sparkColor='#fff'
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
          >
              <AuthProvider>
                  <ClientRoot>{children}</ClientRoot>
              </AuthProvider>

          </ClickSpark>
        </body>
    </html>
  );
}
