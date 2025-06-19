import { Loader2 } from 'lucide-react';

export default function LoadingButton({ 
  children, 
  loading, 
  disabled, 
  icon, 
  className = '', 
  ...props 
}) {
  return (
    <button
      disabled={loading || disabled}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}