/**
 * Select Component
 * 
 * @param {string} label - Label text
 * @param {string} error - Error message to display
 * @param {string} id - Select ID (auto-generated if not provided)
 * @param {string} name - Select name
 * @param {string} value - Select value
 * @param {function} onChange - Change handler
 * @param {boolean} required - Required field
 * @param {string} className - Additional CSS classes
 * @param {Array} options - Array of options { value, label } or strings
 * @param {string} placeholder - Placeholder text (first disabled option)
 * @param {object} props - Additional HTML select props
 */
function Select({
    label,
    error,
    id,
    name,
    value,
    onChange,
    required = false,
    className = '',
    options = [],
    placeholder = 'Select...',
    ...props
}) {
    const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 appearance-none bg-no-repeat bg-[right_1rem_center]';
    const normalStyles = 'border-gray-300 bg-white text-gray-900 focus:border-brand-500 focus:ring-brand-500';
    const errorStyles = 'border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:ring-red-500';

    // Custom arrow SVG encoded as data URI for the background
    const arrowSvg = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e";

    const selectStyles = `${baseStyles} ${hasError ? errorStyles : normalStyles} ${className}`.trim();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    id={selectId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={selectStyles}
                    style={{ backgroundImage: `url("${arrowSvg}")`, backgroundSize: '1.5em 1.5em' }}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${selectId}-error` : undefined}
                    {...props}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option, index) => {
                        const optValue = typeof option === 'object' ? option.value : option;
                        const optLabel = typeof option === 'object' ? option.label : option;
                        return (
                            <option key={index} value={optValue}>
                                {optLabel}
                            </option>
                        );
                    })}
                </select>
            </div>
            {error && (
                <p
                    id={`${selectId}-error`}
                    className="mt-1.5 text-sm text-red-600"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

export default Select;
