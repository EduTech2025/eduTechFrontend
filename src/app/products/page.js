'use client';

import { useRouter } from 'next/navigation';
import '@/styles/globals.css';

import {
  Wand2,
  FileDown,
  FileText,
  Droplet,
  FileUp,
  FileCheck2,
  RefreshCcw,
  Scissors,
  Wrench,
  Lock,
  ShieldCheck,
  CircleSlash,
  FilePlus2,
  ListOrdered,
  FolderOpen,
  Search,
  Globe,
  Image,
} from 'lucide-react';

import { useState, useRef, useEffect } from 'react';
import CustomDropZoneBox from '@/utils/dropzonebox';
import modulesApi from '@/lib/pdf_modules';

const products = [
  {
    name: 'PDF Editor',
    icon: <FileText size={48} className="text-purple-300" />,
    category: 'pdf',
  },
  {
    name: 'Image Tools',
    icon: <Image size={48} className="text-purple-300" />,
    category: 'image',
  },
];

const subProducts = [
  {
    name: 'Image Background Remover',
    icon: <Wand2 size={40} className="text-purple-300" />,
    link: '/products/image-bg-remover',
    category: 'image',
  },
  {
    name: 'PDF to Excel',
    icon: <FileDown size={40} className="text-purple-300" />,
    link: '/products/pdf-to-excel',
    category: 'pdf',
  },
  {
    name: 'PDF Editor',
    icon: <FileText size={40} className="text-purple-300" />,
    link: '/products/pdf-editor',
    category: 'pdf',
  },
  {
    name: 'Add Watermark',
    icon: <Droplet size={40} className="text-purple-300" />,
    link: '/products/add-watermark',
    category: 'pdf',
  },
  {
    name: 'PDF to Word',
    icon: <FileUp size={40} className="text-purple-300" />,
    link: '/products/pdf-to-word',
    category: 'pdf',
  },
  {
    name: 'Merge PDFs',
    icon: <FileCheck2 size={40} className="text-purple-300" />,
    link: '/products/merge-pdfs',
    category: 'pdf',
  },
  {
    name: 'Rotate PDF',
    icon: <RefreshCcw size={40} className="text-purple-300" />,
    link: '/products/pdf-to-rotate',
    category: 'pdf',
  },
  {
    name: 'Split PDF',
    icon: <Scissors size={40} className="text-purple-300" />,
    link: '/products/split-pdf',
    category: 'pdf',
  },
  {
    name: 'Repair PDF',
    icon: <Wrench size={40} className="text-purple-300" />,
    link: '/products/repair-pdf',
    category: 'pdf',
  },
  {
    name: 'Lock/Unlock PDF',
    icon: <Lock size={40} className="text-purple-300" />,
    link: '/products/lock-unlock-pdf',
    category: 'pdf',
  },
  {
    name: 'Protect PDF',
    icon: <ShieldCheck size={40} className="text-purple-300" />,
    link: '/products/protect-pdf',
    category: 'pdf',
  },
  {
    name: 'Compress PDF',
    icon: <CircleSlash size={40} className="text-purple-300" />,
    link: '/products/compress-pdf',
    category: 'pdf',
  },
  {
    name: 'Excel to PDF',
    icon: <FilePlus2 size={40} className="text-purple-300" />,
    link: '/products/excel-to-pdf',
    category: 'pdf',
  },
  {
    name: 'Add Page Numbers',
    icon: <ListOrdered size={40} className="text-purple-300" />,
    link: '/products/pagenumber-pdf',
    category: 'pdf',
  },
  {
    name: 'Organize PDF',
    icon: <FolderOpen size={40} className="text-purple-300" />,
    link: '/products/organize-pdf',
    category: 'pdf',
  },
  {
    name: 'PDF to Images',
    icon: <Search size={40} className="text-purple-300" />,
    link: '/products/pdf-to-images',
    category: 'pdf',
  },
  {
    name: 'Translate Document',
    icon: <Globe size={40} className="text-purple-300" />,
    link: '/products/translate',
    category: 'pdf',
  },
];

const toolsWithSecondModal = ['Organize PDF'];

export default function ProductsPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCategory, setModalCategory] = useState('');
  const [modalSearch, setModalSearch] = useState('');
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [activeSubProduct, setActiveSubProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();


  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleConvert = async () => {
    if (!selectedFile) return

    try {
      setIsLoading(true)
      const res = await modulesApi.excel_to_pdf_api(selectedFile)
      if (!res.ok) throw new Error('Conversion failed')
      
    } catch (err) {
      console.error(err)
      // alert('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    if (modalVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalVisible]);

  useEffect(() => {
    document.body.style.overflow =
      modalVisible || secondModalVisible ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [modalVisible, secondModalVisible]);

  const openModalWithCategory = (category) => {
    setModalCategory(category.toUpperCase());
    setModalSearch('');
    setModalVisible(true);
  };

  return (
    <div className="min-h-screen text-white font-sans px-4 py-6">
      {/* Product Cards */}
      <main className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 px-5 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.name}
            onClick={() => openModalWithCategory(product.category)}
            className="cursor-pointer bg-[#1a1a1a] rounded-2xl border border-white/10 hover:shadow-purple-500/30 transition-all p-4 group"
          >
            <div className="flex space-x-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div className="relative w-full h-36 mb-4 flex items-center justify-center rounded-md overflow-hidden shadow-inner">
              <div className="transition-transform group-hover:scale-110">
                {product.icon}
              </div>
            </div>

            <span className="text-center block text-sm font-medium text-white group-hover:text-purple-300 transition">
              {product.name}
            </span>
          </div>
        ))}
      </main>

      {/* First Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-[#1f1f1f] max-w-7xl h-[90%] w-full rounded-xl p-6 border border-white/10 shadow-lg relative animate-fade-in-scale">
            <button
              onClick={() => setModalVisible(false)}
              className="absolute top-3 right-4 text-white hover:text-red-400 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">
              {modalCategory}
            </h2>

            <div className="flex items-center bg-white/10 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-inner mb-6">
              <Search className="w-5 h-5 text-white" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tools in this category..."
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                className="bg-transparent text-white placeholder-white outline-none ml-2 w-full"
              />
            </div>

            <div className="overflow-y-auto scrollbar-hide h-[calc(100%-120px)] pr-2">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
                {subProducts
                  .filter(
                    (p) =>
                      p.category === modalCategory.toLowerCase() &&
                      p.name.toLowerCase().includes(modalSearch.toLowerCase())
                  )
                  .map((p) => (
                    <div
                      key={`${p.link}-${p.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (toolsWithSecondModal.includes(p.name)) {
                          setActiveSubProduct(p);
                          setSecondModalVisible(true);
                        } else {
                          setLoading(true);
                          router.push(p.link);
                        }
                      }}
                      className="bg-[#121212] rounded-xl border border-white/10 p-4 hover:shadow-purple-500/30 transition-all group cursor-pointer"
                    >
                      <div className="relative w-full h-28 mb-3 flex items-center justify-center rounded-md">
                        <div className="transition-transform group-hover:scale-110">
                          {p.icon}
                        </div>
                      </div>
                      <span className="text-sm text-white group-hover:text-purple-400">
                        {p.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal */}

      {secondModalVisible && activeSubProduct && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-[#1f1f1f] max-w-7xl h-[90%] w-full rounded-xl p-6 border border-white/10 shadow-lg relative animate-fade-in-scale">
            <button
              onClick={() => setSecondModalVisible(false)}
              className="absolute top-3 right-4 text-white hover:text-red-400 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">
              {activeSubProduct.name}
            </h2>

            <div className="text-white text-sm">
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
                      "Convert"
                    )}
                  </button>

                  <span className='w-60'></span>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
