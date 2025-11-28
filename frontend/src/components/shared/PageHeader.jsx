function PageHeader({ title, description, children, variant = "default" }) {
  const variants = {
    default: {
      title: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900",
      description: "text-base sm:text-lg text-gray-600",
    },
    compact: {
      title: "text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900",
      description: "text-sm sm:text-base text-slate-500",
    },
  };

  const styles = variants[variant] || variants.default;

  return (
    <header className="space-y-2 mb-6">
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </header>
  );
}

export default PageHeader;
