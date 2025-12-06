/**
 * Button Component
 * 
 * @param {string} variant - Button style: 'primary', 'secondary', 'outline', 'disabled'
 * @param {string} size - Button size: 'sm', 'md', 'lg'
 * @param {React.ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional HTML button props
 */
function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500 active:bg-brand-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400',
    outline: 'bg-white text-brand-500 border-2 border-brand-500 hover:bg-brand-50 focus:ring-brand-500 active:bg-brand-100',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };
  
  const finalVariant = disabled ? 'disabled' : variant;
  
  const classes = `${baseStyles} ${variantStyles[finalVariant]} ${sizeStyles[size]} ${className}`.trim();
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

