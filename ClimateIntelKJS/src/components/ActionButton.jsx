export const ActionButton = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
  const styles = {
    primary: 'bg-[#0F4C81] text-white hover:opacity-90',
    secondary: 'border border-[#0F4C81] bg-transparent text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
