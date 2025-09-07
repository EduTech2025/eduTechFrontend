import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import ClientRoot from './clientroot/ClientRoot'; // the client wrapper
import GrokStarBackground from '@/utils/ParticleBackground';
import ClickSpark from "@/utils/cursor_tap";

export const metadata = {
  title: 'De Silent Order | Web, App, Marketing & EdTech Platform',
  description: "De Silent Order is a service-based & edutech platform offering Web Development, App Development, SEO, Marketing & Courses for businesses, students & professionals.",
  keywords: 'Web Development, App Development, SEO, Marketing, Courses, EdTech, Service-based platform, Business solutions, Student resources, Professional development',
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicons/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicons/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/favicons/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/favicons/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/favicons/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/favicons/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/favicons/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/favicons/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/favicons/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/favicons/apple-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicons/manifest.json',
      },
    ],
  },
  themeColor: '#ffffff',
  manifest: '/favicons/manifest.json',
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/favicons/ms-icon-144x144.png',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body style={{ fontFamily: 'Anta-Regular',background: 'black' }} className='overflow-x-hidden no-scrollbar'>
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
         
         {/* Google Analytics Scripts */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E5NDLP1LHL"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E5NDLP1LHL');
          `}
        </Script> */}
        </body>
    </html>
  );
}
