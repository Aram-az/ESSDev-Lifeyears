/**
 * SectionTitle Component (H2)
 * 
 * @param {React.ReactNode} children - Title text
 * @param {string} description - Optional subtitle/description
 * @param {React.ReactNode} icon - Optional icon element
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional HTML h2 props
 */
function SectionTitle({
  children,
  description,
  icon,
  className = '',
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center gap-2 mb-1.5">
        {icon && <span className="text-brand-500">{icon}</span>}
        <h2
          className="text-2xl font-semibold text-gray-900"
          {...props}
        >
          {children}
        </h2>
      </div>
      {description && (
        <p className="text-sm text-gray-600 ml-0">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;

