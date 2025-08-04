
import {
    Wand2, FileDown, FileText, Droplet, FileUp, FileCheck2, RefreshCcw, Scissors,
    Wrench, Lock, ShieldCheck, CircleSlash, FilePlus2, ListOrdered, FolderOpen,
    Search, Globe
  } from 'lucide-react';
  
  const subProducts = [
    { name: 'Image Background Remover', icon: <Wand2 size={40} className="text-purple-300" />, link: '/products/image-bg-remover', category: 'image' },
    { name: 'PDF to Excel', icon: <FileDown size={40} className="text-purple-300" />, link: '/products/pdf-to-excel', category: 'pdf' },
    { name: 'PDF Editor', icon: <FileText size={40} className="text-purple-300" />, link: '/products/pdf-editor', category: 'pdf' },
    { name: 'Add Watermark', icon: <Droplet size={40} className="text-purple-300" />, link: '/products/add-watermark', category: 'pdf' },
    { name: 'PDF to Word', icon: <FileUp size={40} className="text-purple-300" />, link: '/products/pdf-to-word', category: 'pdf' },
    { name: 'Merge PDFs', icon: <FileCheck2 size={40} className="text-purple-300" />, link: '/products/merge-pdfs', category: 'pdf' },
    { name: 'Rotate PDF', icon: <RefreshCcw size={40} className="text-purple-300" />, link: '/products/pdf-to-rotate', category: 'pdf' },
    { name: 'Split PDF', icon: <Scissors size={40} className="text-purple-300" />, link: '/products/split-pdf', category: 'pdf' },
    { name: 'Repair PDF', icon: <Wrench size={40} className="text-purple-300" />, link: '/products/repair-pdf', category: 'pdf' },
    { name: 'Lock/Unlock PDF', icon: <Lock size={40} className="text-purple-300" />, link: '/products/lock-unlock-pdf', category: 'pdf' },
    { name: 'Protect PDF', icon: <ShieldCheck size={40} className="text-purple-300" />, link: '/products/protect-pdf', category: 'pdf' },
    { name: 'Compress PDF', icon: <CircleSlash size={40} className="text-purple-300" />, link: '/products/compress-pdf', category: 'pdf' },
    { name: 'Excel to PDF', icon: <FilePlus2 size={40} className="text-purple-300" />, link: '/products/excel-to-pdf', category: 'pdf' },
    { name: 'Add Page Numbers', icon: <ListOrdered size={40} className="text-purple-300" />, link: '/products/pagenumber-pdf', category: 'pdf' },
    { name: 'Organize PDF', icon: <FolderOpen size={40} className="text-purple-300" />, link: '/products/organize-pdf', category: 'pdf' },
    { name: 'PDF to Images', icon: <Search size={40} className="text-purple-300" />, link: '/products/pdf-to-images', category: 'pdf' },
    { name: 'Translate Document', icon: <Globe size={40} className="text-purple-300" />, link: '/products/translate', category: 'pdf' },
  ];

export default function ModalOne({
  modalCategory,
  modalSearch,
  setModalSearch,
  setModalVisible,
  setSecondModalVisible,
  setActiveSubProduct,
  toolsWithSecondModal,
  router,
  setLoading
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-[#1f1f1f] max-w-7xl h-[90%] w-full rounded-xl p-6 border border-white/10 shadow-lg relative animate-fade-in-scale">
        <button
          onClick={() => setModalVisible(false)}
          className="absolute top-3 right-4 text-white hover:text-red-400 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-white">{modalCategory}</h2>

        <div className="flex items-center bg-white/10 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-inner mb-6">
          <Search className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search tools in this category..."
            value={modalSearch}
            onChange={(e) => setModalSearch(e.target.value)}
            className="bg-transparent text-white placeholder-white outline-none ml-2 w-full"
          />
        </div>

        <div className="overflow-y-auto no-scrollbar h-[calc(100%-120px)] pr-2">
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
                    <div className="transition-transform group-hover:scale-110">{p.icon}</div>
                  </div>
                  <span className="text-sm text-white group-hover:text-purple-400">{p.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
