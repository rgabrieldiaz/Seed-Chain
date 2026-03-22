import type { HTMLAttributes, ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for Tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.07] relative overflow-hidden backdrop-blur-[20px] bg-white/[0.03] border border-white/20 shadow-2xl',
        className
      )}
      {...props}
    >
      {/* VIP Glass Shine Effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10">{children}</div>
    </div>
  );
}
