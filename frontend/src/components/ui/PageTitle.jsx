/**
 * PageTitle Component (H1)
 * 
 * @param {React.ReactNode} children - Title text
 * @param {string} description - Optional subtitle/description
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional HTML h1 props
 */
function PageTitle({
  children,
  description,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      <h1
        className="text-4xl font-bold text-gray-900 mb-2"
        {...props}
      >
        {children}
      </h1>
      {description && (
        <p className="text-base text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}

export default PageTitle;

