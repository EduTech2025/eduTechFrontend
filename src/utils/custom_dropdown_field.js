'use client';

import React, { SelectHTMLAttributes, forwardRef } from 'react';

/**
 * @typedef {Object} Option
 * @property {string} label
 * @property {string} value
 */

const CustomSelect = forwardRef(
  (
    {
      label,
      error,
      className = '',
      wrapperClassName = '',
      labelClassName = '',
      errorClassName = '',
      required,
      options,
      id,
      ...rest
    },
    ref
  ) => {
    const baseStyles =
      'bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg transition-all duration-300';
    const errorStyles = error
      ? 'border-red-400/50 focus:ring-red-400'
      : 'focus:ring-blue-400/50';

    return (
      <div className={`flex flex-col ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className={`mb-1 text-sm font-medium text-white/90 ${
              required ? 'after:content-["*"] after:text-red-400 after:ml-1' : ''
            } ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          required={required}
          className={`${baseStyles} px-3 py-2 text-white/90 placeholder-white/50 focus:ring-2 ${errorStyles} ${className}`}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black">
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className={`mt-1 text-sm text-red-400 ${errorClassName}`}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';
export default CustomSelect;
