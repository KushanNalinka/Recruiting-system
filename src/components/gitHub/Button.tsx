export function Button({ children, onClick, disabled, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-2xl shadow-md   bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
