'use client';

import dynamic from 'next/dynamic';

// ⛔ Avoid SSR for this component because it depends on browser-only code
const PDFEditor = dynamic(() => import('./PDFEditor'), { ssr: false });

export default function PDFEditorPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <PDFEditor />
    </main>
  );
}