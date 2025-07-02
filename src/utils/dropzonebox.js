'use client'
import "@/styles/globals.css"
import { FolderOpen } from 'lucide-react'
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  DragEvent,
} from 'react'

/**
 * @typedef {Object} FilePreview
 * @property {number} id
 * @property {string} name
 * @property {string} url
 * @property {'image' | 'pdf' | 'other'} type
 */

/**
 * @typedef {Object} CustomDropZoneBoxProps
 * @property {string} [label]
 * @property {boolean} [required]
 * @property {string} [error]
 * @property {string} [className]
 * @property {string} [wrapperClassName]
 * @property {string} [labelClassName]
 * @property {string} [errorClassName]
 * @property {string} [accept]
 * @property {boolean} [isMultiple] - allow multiple files (default true)
 * @property {(files: FileList) => void} [onFileDrop]
 */

export default function CustomDropZoneBox({
  label,
  required,
  error,
  className = '',
  wrapperClassName = '',
  labelClassName = '',
  errorClassName = '',
  accept,
  isMultiple = true,
  onFileDrop,
}) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previews, setPreviews] = useState([])

  const handleFiles = (files) => {
    if (onFileDrop) onFileDrop(files)
    let type='others'
    const fileArray = Array.from(files)
    const limitedFiles = isMultiple ? fileArray : fileArray.slice(0, 1)

    const newPreviews = limitedFiles.map((file) => {
      const url = URL.createObjectURL(file)
      
      if (file.type.startsWith('image/')) type = 'image'
      else if (file.type === 'application/pdf') type = 'pdf'
      else if (
        file.name.endsWith('.doc') ||
        file.name.endsWith('.docx')
      ) type = 'word'
      else if (
        file.name.endsWith('.xls') ||
        file.name.endsWith('.xlsx')
      ) type = 'excel'
      else if (
        file.name.endsWith('.ppt') ||
        file.name.endsWith('.pptx')
      ) type = 'ppt'

      return {
        id: Date.now() + Math.random(),
        name: file.name,
        url,
        type,
      }
    })

    setPreviews((prev) =>
      isMultiple ? [...prev, ...newPreviews] : newPreviews
    )
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files) handleFiles(files)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files)
  }, [])

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url))
    }
  }, [previews])

  return (
    <div
      className={`flex flex-row items-start justify-between gap-6 ${wrapperClassName}`}
    >
      <div className="flex flex-col w-full">
        {label && (
          <label
            className={`mb-2 text-sm font-medium text-white/90 ${
              required
                ? 'after:content-["*"] after:text-red-400 after:ml-1'
                : ''
            } ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`
            flex items-center justify-center h-40 w-full px-4 text-white text-sm text-center cursor-pointer 
            border-2 border-dashed rounded-lg transition-all duration-300
            ${
              isDragging
                ? 'border-blue-400 bg-blue-400/20'
                : 'border-white/30 bg-white/10'
            }
            backdrop-blur-md shadow-md ${className}
          `}
        >
          <span>
            Drag & drop files here, or{' '}
            <span className="underline">browse</span>
          </span>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={isMultiple}
            onChange={handleFileSelect}
          />
        </div>

        {error && (
          <span className={`mt-1 text-sm text-red-400 ${errorClassName}`}>
            {error}
          </span>
        )}
      </div>

      {/* Preview Section */}
      {previews.length > 0 ? (
        <div className="mt-6 w-60 grid overflow-y-auto grid-cols-1 gap-4">
          {previews.map((file) => (
            <div    
              key={file.id}
              className="overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-md shadow"
            >
              {file.type === 'image' ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-40 w-full object-cover"
                />
              ) : file.type === 'pdf' ? (
                <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                  <FolderOpen size={40} className="text-purple-300 mb-2" />
                  <p className="text-xs text-white/80 truncate">{file.name}</p>
                </div>
              ): ['word', 'excel', 'ppt'].includes(file.type) ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                    <FolderOpen size={40} className="text-green-300 mb-2" />
                    <p className="text-xs text-white/80 truncate">{file.name}</p>
                  </div>
                )  : (
                <p className="p-4 text-sm text-white/80">
                  Unsupported file type: {file.name}
                </p>
              )}
            </div>
          ))}
        </div>
      ):(<div className="mt-6 w-60  grid overflow-y-auto grid-cols-1 gap-4">
            <div    
              className="overflow-hidden   rounded-lg border border-white/20 bg-white/10 backdrop-blur-md shadow"
            >
                <p className="h-full py-18 text-center"> Not Selected</p>
            </div>
        </div>)}
    </div>
  )
}
