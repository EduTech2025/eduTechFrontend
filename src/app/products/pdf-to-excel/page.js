'use client';

import React from 'react';


import modulesApi from '@/lib/pdf_modules';

export default function PdfToExcel() {

  const handleConvert = async () => {
    const input = document.getElementById('pdfInput');
    if (!input || input.files.length === 0) {
      alert('Please select one PDF file.');
      return;
    }

    const file = input.files[0]; 

    try {
      const response = await modulesApi.pdf_to_excel_api(file);
      if(response.status==200){

      }
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('An error occurred during conversion.');
    }
  };

  return (
    <div className="py-5 space-y-4">
      <input
        type="file"
        id="pdfInput"
        accept="application/pdf"
        className="border border-gray-300 rounded px-3 py-2"
      />
      <br />
      <button
        onClick={handleConvert}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Convert to Excel
      </button>
      
    </div>
    
  );
}
