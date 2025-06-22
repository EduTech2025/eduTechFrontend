'use client';

import { useRef, useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function PDFEditor() {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const containerRef = useRef(null);

  const [pdfBytes, setPdfBytes] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const [textItems, setTextItems] = useState([]);
  const [imageItems, setImageItems] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [resizingId, setResizingId] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    setPdfBytes(uint8);
    setTextItems([]);
    setImageItems([]);
    setPdfUrl(URL.createObjectURL(new Blob([uint8], { type: 'application/pdf' })));
  };

  const addTextItem = () => {
    const id = Date.now();
    setTextItems((prev) => [
      ...prev,
      { id, text: 'Edit me', x: 100, y: 100, fontSize: 16, fontColor: '#ffffff' },
    ]);
    setSelectedTextId(id);
  };

  const updateTextItem = (id, changes) => {
    setTextItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  };

  const updateImageItem = (id, changes) => {
    setImageItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...changes } : i)));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageItems((prev) => [
        ...prev,
        { id: Date.now(), src: reader.result, x: 100, y: 100, width: 100, height: 100 },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e, id, type) => {
    if (type === 'text' || type === 'image') setDraggingId(id);
    if (e.target.classList.contains('resizer')) setResizingId(id);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
    setResizingId(null);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (draggingId) {
      const text = textItems.find((t) => t.id === draggingId);
      const image = imageItems.find((i) => i.id === draggingId);
      if (text) updateTextItem(draggingId, { x, y });
      if (image && !resizingId) updateImageItem(draggingId, { x, y });
      else if (image && resizingId) {
        const newW = x - image.x;
        const newH = y - image.y;
        if (newW > 10 && newH > 10) {
          updateImageItem(draggingId, { width: newW, height: newH });
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
    return rgb(((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255);
  };

  const insertTextAndImageIntoPDF = async () => {
    if (!pdfBytes) return;
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (const text of textItems) {
      page.drawText(text.text, {
        x: text.x,
        y: 800 - text.y,
        size: text.fontSize,
        font,
        color: hexToRgb(text.fontColor),
      });
    }

    for (const img of imageItems) {
      const imgBytes = await fetch(img.src).then((res) => res.arrayBuffer());
      const embedded = await pdfDoc.embedPng(imgBytes);
      page.drawImage(embedded, {
        x: img.x,
        y: 800 - img.y - img.height,
        width: img.width,
        height: img.height,
      });
    }

    const newBytes = await pdfDoc.save();
    setPdfBytes(newBytes);
    setPdfUrl(URL.createObjectURL(new Blob([newBytes], { type: 'application/pdf' })));
    // setTextItems([]);
    // setImageItems([]);
  };

  const handleDownload = async () => {
    await insertTextAndImageIntoPDF();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'edited.pdf';
    a.click();
  };

  return (
    <div className="p-6 mx-16 text-white bg-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">📄 PDF Editor (Iframe Version)</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="mb-4 block w-1/2 file:px-4 file:py-2 file:border-0 file:rounded-md file:bg-blue-600 file:text-white"
      />

      {pdfBytes && (
        <div className="mb-6 space-x-4">
          <button onClick={addTextItem} className="px-4 py-1 bg-yellow-600 rounded">
            ➕ Add Text
          </button>
          <button onClick={insertTextAndImageIntoPDF} className="px-4 py-1 bg-yellow-600 rounded">
            ✅ Save
          </button>
          <button onClick={handleDownload} className="px-4 py-1 bg-green-600 rounded">
            💾 Download
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageInputRef}
            className="inline-block ml-4"
          />
        </div>
      )}

      {selectedTextId !== null && (
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-white">
          <input
            type="text"
            className="p-2 rounded bg-white/10"
            value={textItems.find((t) => t.id === selectedTextId)?.text || ''}
            onChange={(e) => updateTextItem(selectedTextId, { text: e.target.value })}
          />
          <input
            type="number"
            className="p-2 rounded bg-white/10"
            value={textItems.find((t) => t.id === selectedTextId)?.fontSize || 16}
            onChange={(e) => updateTextItem(selectedTextId, { fontSize: +e.target.value })}
          />
          <input
            type="color"
            className="rounded"
            value={textItems.find((t) => t.id === selectedTextId)?.fontColor || '#ffffff'}
            onChange={(e) => updateTextItem(selectedTextId, { fontColor: e.target.value })}
          />
        </div>
      )}

      <div ref={containerRef} className="relative w-[800px] h-[1000px] border border-white/20 rounded overflow-hidden">
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            className="w-full h-full pointer-events-none"
            title="PDF Preview"
          />
        )}

        {textItems.map((item) => (
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
          >
            {item.text}
          </div>
        ))}

        {imageItems.map((img) => (
          <div
            key={img.id}
            onMouseDown={(e) => handleMouseDown(e, img.id, 'image')}
            style={{
              position: 'absolute',
              top: `${img.y}px`,
              left: `${img.x}px`,
              zIndex: 999,
            }}
          >
            <img src={img.src} style={{ width: img.width, height: img.height }} />
            <div
              className="resizer"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                backgroundColor: 'white',
                bottom: 0,
                right: 0,
                cursor: 'nwse-resize',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
