/**
 * Badge Component
 * 
 * @param {string} variant - Badge style: 'confirmed', 'pending', 'default'
 * @param {React.ReactNode} children - Badge content
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional HTML span props
 */
function Badge({
  variant = 'default',
  children,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variantStyles = {
    confirmed: 'bg-brand-500 text-white',
    pending: 'bg-brand-200 text-brand-800',
    default: 'bg-gray-200 text-gray-800',
  };
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

export default Badge;

