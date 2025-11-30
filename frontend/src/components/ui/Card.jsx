/**
 * Card Component
 * 
 * @param {React.ReactNode} header - Header content
 * @param {React.ReactNode} children - Main body content
 * @param {React.ReactNode} footer - Footer content
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional HTML div props
 */
function Card({
  header,
  children,
  footer,
  className = '',
  ...props
}) {
  const baseStyles = 'bg-white rounded-xl border border-brand-200 shadow-sm';
  
  const classes = `${baseStyles} ${className}`.trim();
  
  return (
    <div className={classes} {...props}>
      {header && (
        <div className="px-6 py-4 border-b border-brand-200">
          {header}
        </div>
      )}
      <div className={header || footer ? 'px-6 py-4' : 'p-6'}>
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-brand-200">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;

