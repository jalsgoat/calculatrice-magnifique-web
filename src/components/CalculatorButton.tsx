
import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  span?: number;
}

const CalculatorButton = ({ children, onClick, className, span = 1 }: CalculatorButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-14 rounded-xl font-semibold text-lg transition-all duration-200 transform active:scale-95 shadow-lg",
        "bg-gradient-to-b from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600",
        "text-white border border-white/20",
        "hover:shadow-xl hover:-translate-y-0.5",
        span === 2 && "col-span-2",
        className
      )}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
