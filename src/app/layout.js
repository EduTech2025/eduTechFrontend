// app/layout.js (or layout.tsx if using TypeScript)
export const metadata = {
  title: 'My App',
  description: 'A simple app with Home and About pages',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
