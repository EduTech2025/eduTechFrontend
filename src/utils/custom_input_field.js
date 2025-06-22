import React, { InputHTMLAttributes, forwardRef, ChangeEvent } from 'react';


const CustomInput = forwardRef(
  (
    {
      label,
      error,
      className = '',
      wrapperClassName = '',
      labelClassName = '',
      errorClassName = '',
      accept,
      multiple,
      onFileChange,
      required,
      type,
      ...props
    },
    ref
  ) => {
    const handleFileChange = (e) => {
      if (type === 'file' && onFileChange) {
        onFileChange(e.target.files);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const baseGlassmorphismStyles =
      'bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg transition-all duration-300';
    const fileInputStyles =
      type === 'file'
        ? 'file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-500/80 file:text-white file:backdrop-blur-md hover:file:bg-red-600/80'
        : '';

    return (
      <div className={`flex flex-col ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`mb-1 text-sm font-medium text-white/90 ${
              required ? 'after:content-["*"] after:text-red-400 after:ml-1' : ''
            } ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          accept={accept}
          multiple={multiple}
          className={`${baseGlassmorphismStyles} px-3 py-2 text-white/90 placeholder-white/50 focus:ring-2 ${
            error
              ? 'border-red-400/50 focus:ring-red-400'
              : type === 'file'
              ? 'border-red-400/50 focus:ring-red-400'
              : 'focus:ring-blue-400/50'
          } ${fileInputStyles} ${className}`}
          onChange={handleFileChange}
          required={required}
          {...props}
        />
        {error && (
          <span className={`mt-1 text-sm text-red-400 ${errorClassName}`}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;