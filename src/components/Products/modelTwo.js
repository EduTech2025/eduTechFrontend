import CustomDropZoneBox from '@/utils/dropzonebox';
import modulesApi from '@/lib/pdf_modules';
import { useState } from 'react';

export default function ModalTwo({ activeSubProduct, setSecondModalVisible }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    if (!selectedFile) return;
    try {
      setIsLoading(true);
      const res = await modulesApi.excel_to_pdf_api(selectedFile);
      if (!res.ok) throw new Error('Conversion failed');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-[#1f1f1f] max-w-7xl h-[90%] w-full rounded-xl p-6 border border-white/10 shadow-lg relative animate-fade-in-scale">
        <button
          onClick={() => setSecondModalVisible(false)}
          className="absolute top-3 right-4 text-white hover:text-red-400 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-white">{activeSubProduct.name}</h2>

        <main className="p-10 text-white flex flex-col justify-between">
          <CustomDropZoneBox
            label="Upload Single Image"
            isMultiple={false}
            accept=".xls,.xlsx"
            onFileDrop={(files) => setSelectedFile(files?.[0] ?? null)}
          />

          <div className="flex justify-center mt-6">
            <button
              onClick={handleConvert}
              disabled={!selectedFile || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-[20%] py-[1%] rounded-md shadow-md disabled:bg-gray-600 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Converting...
                </span>
              ) : (
                'Convert'
              )}
            </button>
            <span className="w-60"></span>
          </div>
        </main>
      </div>
    </div>
  );
}
