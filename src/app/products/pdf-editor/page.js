'use client';

import { useEffect, useRef, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js`;

export default function PDFEditor() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef();
  const imageInputRef = useRef();

  const [pdfBytes, setPdfBytes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [pdfPageHeight, setPdfPageHeight] = useState(0);

  const [textItems, setTextItems] = useState([]); // Multiple text boxes
  const [selectedTextId, setSelectedTextId] = useState(null);

  const [imageItems, setImageItems] = useState([]); // Multiple image boxes
  const [selectedImageId, setSelectedImageId] = useState(null);

  const [draggingId, setDraggingId] = useState(null);
  const [resizingId, setResizingId] = useState(null);

  const renderPDF = async (bytes, pageNumber = 1) => {
    setLoading(true);
    const loadingTask = getDocument({ data: bytes });
    const pdf = await loadingTask.promise;

    setNumPages(pdf.numPages);
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });

    setViewportHeight(viewport.height);
    setPdfPageHeight(page.view[2]);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    setLoading(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    setPdfBytes(arrayBuffer);
    setCurrentPage(1);
    setTextItems([]);
    setImageItems([]);
    renderPDF(arrayBuffer, 1);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageItems(prev => [...prev, {
        id: Date.now(),
        src: reader.result,
        x: 100,
        y: 100,
        width: 100,
        height: 100
      }]);
    };
    reader.readAsDataURL(file);
  };

  const addTextItem = () => {
    const id = Date.now();
    setTextItems(prev => [...prev, {
      id,
      text: 'Edit me',
      x: 100,
      y: 100,
      fontSize: 16,
      fontColor: '#ffffff'
    }]);
    setSelectedTextId(id);
  };

  const updateTextItem = (id, changes) => {
    setTextItems(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t));
  };

  const updateImageItem = (id, changes) => {
    setImageItems(prev => prev.map(i => i.id === id ? { ...i, ...changes } : i));
  };

  const handleMouseDown = (e, id, type) => {
    if (type === 'text') setDraggingId(id);
    else if (type === 'image') setDraggingId(id);
    if (e.target.classList.contains('resizer')) {
      setResizingId(id);
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
    setResizingId(null);
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (draggingId) {
      const image = imageItems.find(i => i.id === draggingId);
      const text = textItems.find(t => t.id === draggingId);

      if (text) updateTextItem(draggingId, { x, y });
      if (image && !resizingId) updateImageItem(draggingId, { x, y });
      else if (resizingId) {
        const iw = x - image.x;
        const ih = y - image.y;
        if (iw > 10 && ih > 10) {
          updateImageItem(draggingId, { width: iw, height: ih });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, resizingId]);

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return rgb(
      ((bigint >> 16) & 255) / 255,
      ((bigint >> 8) & 255) / 255,
      (bigint & 255) / 255
    );
  };

  const insertTextAndImageIntoPDF = async () => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const page = pages[currentPage - 1];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const scale = pdfPageHeight / viewportHeight;

    for (const text of textItems) {
      page.drawText(text.text, {
        x: text.x * scale,
        y: (viewportHeight - text.y - text.fontSize) * scale,
        size: text.fontSize * scale,
        font,
        color: hexToRgb(text.fontColor)
      });
    }

    for (const image of imageItems) {
      const imageBytes = await fetch(image.src).then(res => res.arrayBuffer());
      const embeddedImg = await pdfDoc.embedPng(imageBytes);
      page.drawImage(embeddedImg, {
        x: image.x * scale,
        y: (viewportHeight - image.y - image.height) * scale,
        width: image.width * scale,
        height: image.height * scale,
      });
    }

    const newBytes = await pdfDoc.save();
    setPdfBytes(newBytes);
    renderPDF(newBytes, currentPage);
    setTextItems([]);
    setImageItems([]);
  };

  const handleDownload = async () => {
    await insertTextAndImageIntoPDF();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const goToPage = (direction) => {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= numPages) {
      setCurrentPage(newPage);
      renderPDF(pdfBytes, newPage);
    }
  };

  return (
    <div className="p-6 mx-16 mx-auto text-white bg-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">📄 PDF Editor</h2>

      <input type="file" accept="application/pdf" onChange={handleFileChange} ref={fileInputRef} className="mb-4 block w-1/2 file:px-4 file:py-2 file:border-0 file:rounded-md file:bg-blue-600 file:text-white file:cursor-pointer bg-white/10 backdrop-blur border border-white/20 rounded-lg" />
     <div className='flex px-8 gap-16'>
      {pdfBytes && (
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => goToPage(-1)} disabled={currentPage === 1} className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50">⬅️ Prev</button>
            <span className="text-sm font-medium">Page {currentPage} / {numPages}</span>
            <button onClick={() => goToPage(1)} disabled={currentPage === numPages} className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50">Next ➡️</button>
            <button onClick={addTextItem} className="px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">➕ Add Text</button>
            <button onClick={insertTextAndImageIntoPDF} className="px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">✅ Save</button>
            <button onClick={handleDownload} className="ml-auto px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">💾 Download</button>
          </div>

          {selectedTextId !== null && (
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm text-white">
                <div className="flex flex-col">
                    <label htmlFor="textEdit" className="mb-1">Edit Text</label>
                    <input
                    id="textEdit"
                    className="p-2 text-white rounded border border-gray-300"
                    placeholder="Enter text..."
                    value={textItems.find(t => t.id === selectedTextId)?.text || ''}
                    onChange={(e) => updateTextItem(selectedTextId, { text: e.target.value })}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="fontSizeEdit" className="mb-1">Font Size</label>
                    <input
                    type="number"
                    id="fontSizeEdit"
                    className="p-2 text-white rounded border border-gray-300"
                    placeholder="Size"
                    value={textItems.find(t => t.id === selectedTextId)?.fontSize || 16}
                    onChange={(e) => updateTextItem(selectedTextId, { fontSize: Number(e.target.value) })}
                    />
                </div>

               <div className="flex flex-col">
                    <label htmlFor="fontColorEdit" className="mb-1">Font Color</label>
                    <input
                        type="color"
                        id="fontColorEdit"
                        className="rounded border border-gray-300"
                        style={{ width: '80%', height: '35px' }} // You can adjust height here (e.g., '3rem', '60px')
                        value={textItems.find(t => t.id === selectedTextId)?.fontColor || '#ffffff'}
                        onChange={(e) => updateTextItem(selectedTextId, { fontColor: e.target.value })}
                    />
            </div>

            </div>

          )}

          <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageInputRef} className="w-full p-2 border border-gray-300 rounded text-black bg-white mb-4" />
        </div>
      )}

     <div>
      <div ref={containerRef} className="relative inline-block border border-white/20 rounded shadow-md">
        {loading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            Loading PDF...
          </div>
        )}
        <canvas ref={canvasRef} />

        {textItems.map(item => (
          <div
            key={item.id}
            onMouseDown={(e) => handleMouseDown(e, item.id, 'text')}
            onClick={() => setSelectedTextId(item.id)}
            style={{
              position: 'absolute',
              top: `${item.y}px`,
              left: `${item.x}px`,
              fontSize: `${item.fontSize}px`,
              color: item.fontColor,
              cursor: 'move',
              userSelect: 'none',
              zIndex: 1000,
            }}
          >{item.text}</div>
        ))}

        {imageItems.map(img => (
          <div
            key={img.id}
            onMouseDown={(e) => handleMouseDown(e, img.id, 'image')}
            style={{ position: 'absolute', top: `${img.y}px`, left: `${img.x}px`, zIndex: 999 }}
          >
            <img src={img.src} alt="preview" style={{ width: img.width, height: img.height }} />
            <div className="resizer" style={{ position: 'absolute', width: '15px', height: '15px', backgroundColor: 'white', bottom: 0, right: 0, cursor: 'nwse-resize' }} />
          </div>
        ))}
</div>
        </div>
      </div>
    </div>
  );
}
