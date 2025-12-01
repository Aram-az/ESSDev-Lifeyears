/**
 * Input Component
 * 
 * @param {string} label - Label text
 * @param {string} error - Error message to display
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} id - Input ID (auto-generated if not provided)
 * @param {string} name - Input name
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional HTML input props
 */
function Input({
  label,
  error,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  ...props
}) {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const inputBaseStyles = 'w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  const inputNormalStyles = 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:ring-brand-500';
  const inputErrorStyles = 'border-red-500 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-red-500';
  
  const inputStyles = `${inputBaseStyles} ${hasError ? inputErrorStyles : inputNormalStyles} ${className}`.trim();
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputStyles}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;

