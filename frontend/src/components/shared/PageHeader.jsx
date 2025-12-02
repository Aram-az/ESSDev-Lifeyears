function PageHeader({ title, description, children }) {
  return (
    <header className="space-y-2 mb-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg text-gray-600">{description}</p>
      )}
      {children}
    </header>
  );
}

export default PageHeader;
