function PageContainer({ children, maxWidth = "2xl" }) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "7xl": "max-w-7xl",
  };

  return (
    <div className={`${maxWidthClasses[maxWidth]} mx-auto w-full`}>
      {children}
    </div>
  );
}

export default PageContainer;
